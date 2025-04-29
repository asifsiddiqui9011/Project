// async function processVoiceWithPython(text) {
//     const response = await fetch("http://localhost:8000/process-voice/", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ text }),
//     });

//     return await response.json(); // { "intent": "add_to_cart", "itemId": "123" }
// }

// exports.processVoiceCommand = async (req, res) => {
//     const { text } = req.body;
//     const userId = req.user.id;

//     // Call FastAPI NLP Service
//     const result = await processVoiceWithPython(text);
//     if (!result) return res.status(500).json({ message: "NLP processing failed." });

//     let userData = await Users.findOne({ _id: userId });

//     let responseMessage = "";
//     if (result.intent === "add_to_cart") {
//         userData.cartData[result.itemId] = (userData.cartData[result.itemId] || 0) + 1;
//         await Users.findByIdAndUpdate(userId, { cartData: userData.cartData });
//         responseMessage = `Item ${result.itemId} added to cart.`;
//     }

//     res.json({ message: responseMessage });
// };


