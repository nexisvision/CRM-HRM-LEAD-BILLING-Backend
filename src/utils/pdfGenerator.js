import PDFDocument from 'pdfkit';

export const generateBillPDF = async (client, plan, subscription, bill, res) => {
    const doc = new PDFDocument({
        layout: 'portrait',
        size: 'A4',
        margins: {
            top: 50,
            bottom: 50,
            left: 50,
            right: 50
        }
    });

    // Set response headers for PDF streaming
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=bill.pdf`);

    // Pipe the PDF directly to the response
    doc.pipe(res);

    // Header
    doc
        .fontSize(24)
        .fillColor('#87CEEB') // SkyBlue
        .text('CRM - Client Relationship Management', { align: 'center' });
    doc
        .fontSize(18)
        .fillColor('black')
        .text('BILL', { align: 'center' });
    doc.moveDown();

    // Bill details
    doc.fontSize(14);
    doc.fillColor('black');
    doc.text(`Bill No: ${bill.id}`, { continued: true });
    doc.text(`                                         Date: ${new Date(bill.billDate).toLocaleDateString()}`);
    doc.moveDown();

    // Client details
    doc.text('Bill To:');
    doc.fontSize(12);
    doc.text(client.username);
    doc.text(client.email);
    doc.moveDown();

    // Subscription details
    doc.fontSize(14);
    doc.text('Subscription Details:');
    doc.fontSize(12);
    doc.text(`Plan Name: ${plan.name}`);
    doc.text(`Duration: ${plan.duration}`);
    doc.text(`Start Date: ${new Date(subscription.start_date).toLocaleDateString()}`);
    if (subscription.end_date) {
        doc.text(`End Date: ${new Date(subscription.end_date).toLocaleDateString()}`);
    }
    doc.moveDown();

    // Plan features
    doc.fontSize(14);
    doc.text('Plan Features:');
    doc.fontSize(12);
    doc.text(`• Max Users: ${plan.max_users}`);
    doc.text(`• Max Clients: ${plan.max_clients}`);
    doc.text(`• Storage Limit: ${plan.storage_limit}`);
    doc.moveDown();

    // Billing summary
    doc.fontSize(14);
    doc.text('Billing Summary:');
    doc.fontSize(12);

    // Create table-like structure
    const tableTop = doc.y + 10;
    const tableLeft = 50;
    const colWidth = 250;
    const rowHeight = 20;
    const rows = [
        ['Description', 'Amount'],
        ['Subtotal', `$${plan.price}`],
        ['Discount', `$${bill.discount || 0}`],
        ['Tax', `$${bill.tax || 0}`],
        ['Total Amount', `$${bill.total}`]
    ];

    // Draw table
    rows.forEach((row, i) => {
        const y = tableTop + (i * rowHeight);
        
        // Draw row background
        if (i === 0) {
            doc
                .fillColor('#f0f0f0')
                .rect(tableLeft, y, colWidth * 2, rowHeight)
                .fill();
        }
        
        // Draw cell borders
        doc
            .strokeColor('#000000')
            .lineWidth(0.5)
            .rect(tableLeft, y, colWidth, rowHeight)
            .rect(tableLeft + colWidth, y, colWidth, rowHeight)
            .stroke();

        // Add text
        doc
            .fillColor('#000000')
            .fontSize(i === 0 || i === rows.length - 1 ? 12 : 10)
            .text(row[0], tableLeft + 5, y + 5)
            .text(row[1], tableLeft + colWidth + 5, y + 5);
    });

    doc.moveDown(4);

    // Footer
    doc
        .fontSize(10)
        .text('Thank you for your business!', {
            align: 'center',
            y: doc.page.height - 100
        });

    // End the document
    doc.end();
};
