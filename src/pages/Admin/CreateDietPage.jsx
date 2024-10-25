import React, { useState, useEffect } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import axios from 'axios';
import '../../styles/CreateDietPage.css';

const CreateDietPage = () => {
  const [dietTemplates, setDietTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [meals, setMeals] = useState({
    breakfast: [{ meal: '', quantity: '' }],
    midDay: [{ meal: '', quantity: '' }],
    lunch: [{ meal: '', quantity: '' }],
    dinner: [{ meal: '', quantity: '' }],
  });

  useEffect(() => {
    const fetchDietTemplates = async () => {
      try {
        const response = await axios.get('/api/admin/diettemplates');
        setDietTemplates(response.data.list);
      } catch (error) {
        console.error('Error fetching diet templates', error);
      }
    };
    fetchDietTemplates();
  }, []);

  const fetchDietTemplateById = async (id) => {
    try {
      const response = await axios.get(`/api/admin/diettemplate/${id}`);
      setSelectedTemplate(response.data.template);
    } catch (error) {
      console.error('Error fetching diet template by ID', error);
    }
  };

  const addMeal = (type) => {
    setMeals({
      ...meals,
      [type]: [...meals[type], { meal: '', quantity: '' }],
    });
  };

  const removeMeal = (type, index) => {
    const updatedMeals = meals[type].filter((_, i) => i !== index);
    setMeals({ ...meals, [type]: updatedMeals });
  };

  const handleMealChange = (type, index, field, value) => {
    const updatedMeals = [...meals[type]];
    updatedMeals[index][field] = value;
    setMeals({ ...meals, [type]: updatedMeals });
  };

  const mealOptions = ['Methi Dosa', 'Oatmeal', 'Salad', 'Grilled Chicken', 'Soup'];
  const quantityOptions = ['1', '2', '3'];

  const renderMealSection = (mealType, title) => (
    <div className="meal-section">
      <h3>{title}</h3>
      <div className="meal-boxes">
        {meals[mealType].map((meal, index) => (
          <div key={index} className="meal-box">
            <Form.Group controlId={`${mealType}-meal-${index}`} className="mb-2">
              <Form.Control
                as="select"
                value={meal.meal}
                onChange={(e) => handleMealChange(mealType, index, 'meal', e.target.value)}
                className="custom-dropdown"
              >
                <option value="">Select a meal</option>
                {mealOptions.map((mealOption, idx) => (
                  <option key={idx} value={mealOption}>
                    {mealOption}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId={`${mealType}-quantity-${index}`} className="mb-2">
              <Form.Control
                as="select"
                value={meal.quantity}
                onChange={(e) => handleMealChange(mealType, index, 'quantity', e.target.value)}
                className="custom-dropdown"
              >
                <option value="">Select quantity</option>
                {quantityOptions.map((quantity, idx) => (
                  <option key={idx} value={quantity}>
                    {quantity}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Button
              variant="danger"
              onClick={() => removeMeal(mealType, index)}
              className="remove-meal-btn"
            >
              &#x2715;
            </Button>
          </div>
        ))}
        <div className="add-meal-box" onClick={() => addMeal(mealType)}>
          <h1>+</h1>
        </div>
      </div>
      <hr />
    </div>
  );

  return (
    <div className="create-diet-page">
      <div className="left-section">
        <div className="title-and-template">
          <h1 className="page-title">Create Diet</h1>
          <Form.Group controlId="templateSelect" className="template-select">
            <Form.Control
              as="select"
              onChange={(e) => fetchDietTemplateById(e.target.value)}
              className="custom-dropdown"
            >
              <option value="">Select a template</option>
              {dietTemplates.map((template) => (
                <option key={template.id} value={template.id}>
                  {template.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </div>

        {selectedTemplate && (
          <Card className="selected-template">
            <Card.Body>
              <h2>Selected Template: {selectedTemplate.name}</h2>
            </Card.Body>
          </Card>
        )}

        {renderMealSection('breakfast', 'Breakfast (8:00 AM - 9:00 AM)')}
        {renderMealSection('midDay', 'Mid Day (11:00 AM)')}
        {renderMealSection('lunch', 'Lunch (1:00 PM - 2:00 PM)')}
        {renderMealSection('dinner', 'Dinner (8:00 PM - 9:00 PM)')}
      </div>

      <div className="right-section">
        <h2>View Past Diets and Templates</h2>
        <div className="past-diet-section">
          <Form.Group controlId="weekSelect" className="template-select no-gap">
            <Form.Control as="select" className="custom-dropdown">
              <option value="">Select Week</option>
              <option value="week1">Week 1</option>
              <option value="week2">Week 2</option>
              <option value="week3">Week 3</option>
              <option value="week4">Week 4</option>
              <option value="week5">Week 5</option>
              <option value="week6">Week 6</option>
              <option value="week7">Week 7</option>
              <option value="week8">Week 8</option>
              <option value="week9">Week 9</option>
              <option value="week10">Week 10</option>
            </Form.Control>
          </Form.Group>
        </div>

        <div className="view-past-container">
          <p>Here you can view past diets details...</p>
        </div>
      </div>
    </div>
  );
};

export default CreateDietPage;