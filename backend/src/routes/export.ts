import PDFDocument from 'pdfkit';
import fs from 'fs';
import express from 'express';

const router = express.Router();

// Mock data - replace with your actual data retrieval logic.
let groups = {
    'group1': {
        name: 'Group One',
        members: [
            { name: 'Member One', contributions: 100 },
            { name: 'Member Two', contributions: 150 }
        ],
        auctionWinners: [
            { name: 'Auction Winner One', item: 'Item A' },
            { name: 'Auction Winner Two', item: 'Item B' }
        ]
    }
};

// GET /pdf/:groupId endpoint to generate PDF
router.get('/pdf/:groupId', (req, res) => {
    const groupId = req.params.groupId;
    const group = groups[groupId];

    if (!group) {
        return res.status(404).send('Group not found');
    }

    const pdfDoc = new PDFDocument();
    let filename = `group_${groupId}.pdf`;
    res.setHeader('Content-disposition', `attachment; filename=${filename}`);
    res.setHeader('Content-type', 'application/pdf');
    pdfDoc.pipe(res);

    // Group information
    pdfDoc.fontSize(20).text(`Group Name: ${group.name}`, { underline: true });
    pdfDoc.moveDown();

    // Members list
    pdfDoc.fontSize(16).text('Members:', { underline: true });
    group.members.forEach(member => {
        pdfDoc.text(`Name: ${member.name}, Contributions: ${member.contributions}`);
    });
    pdfDoc.moveDown();

    // Auction winners table
    pdfDoc.fontSize(16).text('Auction Winners:', { underline: true });
    group.auctionWinners.forEach(winner => {
        pdfDoc.text(`Name: ${winner.name}, Item: ${winner.item}`);
    });
    pdfDoc.moveDown();

    pdfDoc.end();
});

// GET /json/:groupId endpoint to export group data as JSON
router.get('/json/:groupId', (req, res) => {
    const groupId = req.params.groupId;
    const group = groups[groupId];

    if (!group) {
        return res.status(404).send('Group not found');
    }
    res.json(group);
});

export default router;