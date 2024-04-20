const { Configuration, OpenAIApi } = require("openai");
const Order = require('./model/order.model.js'); // MongoDB model for orders
const FAQ = require('./model/faq.js'); // MongoDB model for FAQs
const DeliveryUpdate = require('./model/deliveryupdate.js'); // MongoDB model for delivery updates

// Initialize OpenAI API with your API key
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Function to handle retrieval and generation
async function handleRAG(query) {
  // Step 1: Retrieve relevant information based on the query
  const retrievedData = await retrieveData(query);

  // Step 2: Generate a response using both the query and the retrieved data
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${retrievedData}\n\n${query}`,
    max_tokens: 150
  });

  return response.data.choices[0].text;
}

async function retrieveData(query) {
    // Example logic to determine the type of query and fetch relevant data
    if (query.includes("order status")) {
      const orderId = extractOrderId(query); // Assume you have a function to extract order ID from the query
      const order = await Order.findOne({ orderId: orderId });
      return order ? `The status of order ${orderId} is ${order.status}.` : "Order not found.";
    } else if (query.includes("delivery issue")) {
      const deliveryUpdate = await DeliveryUpdate.findOne({ issue: { $regex: query, $options: 'i' } });
      return deliveryUpdate ? deliveryUpdate.description : "No delivery issues found matching your query.";
    } else {
      const faq = await FAQ.findOne({ question: { $regex: query, $options: 'i' } });
      return faq ? faq.answer : "No FAQ found matching your query.";
    }
  }
  
  function extractOrderId(query) {
    // Dummy function to extract order ID from the query
    const match = query.match(/\d+/); // Simple regex to find numbers in the query
    return match ? match[0] : null;
  }

// Socket event listener
io.on('connection', (socket) => {
  socket.on('sendMessage', async (message) => {
    const ragResponse = await handleRAG(message);
    io.emit('receiveMessage', ragResponse);
  });
});
