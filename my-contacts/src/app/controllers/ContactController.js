const ContactRepository = require('../repositories/ContactRepository');

class ContactController {
  async index(request, response) {
    try {
      const { orderBy } = request.query;

      const contacts = await ContactRepository.findAll(orderBy);

      response.json(contacts);
    } catch (error) {
      return response.status(500).json({ error: 'Internal server error' });
    }
  }

  async show(request, response) {
    try {
      const { id } = request.params;
      const contact = await ContactRepository.findById(id);

      if (!contact) {
        return response.status(404).json({ error: 'Contact not found' });
      }

      response.json(contact);
    } catch (error) {
      return response.status(500).json({ error: 'Internal server error' });
    }
  }

  async store(request, response) {
    try {
      const { name, email, phone, category_id } = request.body;

      if (!name) {
        return response.status(400).json({ error: 'Name is required' });
      }

      const contactExists = await ContactRepository.findByEmail(email);

      if (contactExists) {
        return response
          .status(400)
          .json({ error: 'This e-mail is already in use' });
      }

      const contact = await ContactRepository.create({
        name,
        email,
        phone,
        category_id,
      });

      response.json(contact);
    } catch (error) {
      return response.status(500).json({ error: 'Internal server error' });
    }
  }

  async update(request, response) {
    try {
      const { id } = request.params;
      const { name, email, phone, category_id } = request.body;

      const contactExists = await ContactRepository.findById(id);

      if (!contactExists) {
        return response.status(404).json({ error: 'Contact not found' });
      }

      if (!name) {
        return response.status(400).json({ error: 'Name is required' });
      }

      const contactByEmail = await ContactRepository.findByEmail(email);

      if (contactByEmail && contactByEmail.id !== id) {
        return response
          .status(400)
          .json({ error: 'This e-mail is already in use' });
      }

      const contact = await ContactRepository.update(id, {
        name,
        email,
        phone,
        category_id,
      });

      response.json(contact);
    } catch (error) {
      return response.status(500).json({ error: 'Internal server error' });
    }
  }

  async delete(request, response) {
    try {
      const { id } = request.params;

      await ContactRepository.delete(id);
      response.sendStatus(204);
    } catch (error) {
      return response.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = new ContactController();
