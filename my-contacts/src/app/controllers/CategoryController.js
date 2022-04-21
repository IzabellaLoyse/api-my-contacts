const CategoriesRepository = require('../repositories/CategoriesRepository');

class CategoryController {
  async index(request, response) {
    try {
      const categories = await CategoriesRepository.findAll();
      return response.json(categories);
    } catch (error) {
      return response.status(500).json({ error: 'Internal server error' });
    }
  }

  async show(request, response) {
    try {
      const { id } = request.params;
      const category = await CategoriesRepository.findById(id);

      if (!category) {
        return response.status(404).json({ error: 'Cotegory not found' });
      }

      response.json(category);
    } catch (error) {
      return response.status(500).json({ error: 'Internal server error' });
    }
  }

  async store(request, response) {
    try {
      const { name } = request.body;

      if (!name) {
        return response.status(400).json({ error: 'Name is required' });
      }

      const category = await CategoriesRepository.create({ name });

      response.json(category);
    } catch (error) {
      return response.status(500).json({ error: 'Internal server error' });
    }
  }

  async update(request, response) {
    try {
      const { id } = request.params;
      const { name } = request.body;

      if (!name) {
        return response.status(400).json({ error: 'Name is required' });
      }

      const category = await CategoriesRepository.update(id, { name });

      response.json(category);
    } catch (error) {
      return response.status(500).json({ error: 'Internal server error' });
    }
  }

  async delete(request, response) {
    try {
      const { id } = request.params;

      await CategoriesRepository.delete(id);

      response.sendStatus(204);
    } catch (error) {
      return response.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = new CategoryController();
