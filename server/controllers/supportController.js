const SupportTicket = require('../models/SupportTicket');

exports.getTickets = async (req, res) => {
  try {
    const query = req.user.role === 'SuperAdmin' ? {} : { clinicId: req.clinicId };
    const tickets = await SupportTicket.find(query).sort({ createdAt: -1 });
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createTicket = async (req, res) => {
  try {
    const { subject, description, priority, category } = req.body;
    const count = await SupportTicket.countDocuments();
    const ticketNumber = `TCK-${new Date().getFullYear()}-${String(count + 1).padStart(4, '0')}`;

    const ticket = await SupportTicket.create({
      clinicId: req.clinicId,
      userId: req.user.id,
      ticketNumber,
      subject,
      description,
      priority: priority || 'Medium',
      category: category || 'General',
      status: 'Open'
    });

    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addReply = async (req, res) => {
  try {
    const { message } = req.body;
    const ticket = await SupportTicket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });

    ticket.replies.push({
      senderName: req.user.name,
      senderRole: req.user.role,
      message,
      createdAt: new Date()
    });

    await ticket.save();
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
