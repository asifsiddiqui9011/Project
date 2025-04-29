// import React, { useContext, useEffect, useState,useRef } from 'react';
// import './VoiceAssists.css'
// import { FaMicrophone } from "react-icons/fa6";
// import { useNavigate } from 'react-router-dom';
// import { ShopContext } from '../../context/shopContext';
// //import { VoiceContext } from '../../VoiceContext/VoiceContext';

// // The main component for handling voice recognition and synthesis
// const VoiceAssistedEcommerce = () => {

//   const {userData,component,handleship} = useContext(ShopContext)
//   const [selectedAddress, setSelectedAddress] = useState(null); // State for selected address
//   console.log(selectedAddress,"selected")

//   const [address, setAddress] = useState([]);
//   const [orders, setOrders] = useState([]);
//   var addr = address
//   console.log(addr,"aaaddr")
//   console.log(component,"component")

//   const addressRef = useRef([]);
//   const orderRef = useRef([]); // Create a ref to hold the latest address state

//   useEffect(() => {
//     if (Array.isArray(userData?.address) && userData.address.length > 0) {
//       setAddress(userData.address);
//       addressRef.current = userData.address; // Update the ref with the latest address
//       console.log("Address set to:", userData.address);
//     } else {
//       console.log("No valid addresses found.");
//     }

//     if (Array.isArray(userData?.Order) && userData.Order.length > 0) {
//       setOrders(userData.Order);
//       orderRef.current = userData.Order; // Update the ref with the latest address
//       console.log("order set to:", userData.Order);
//     } else {
//       console.log("No valid order found.");
//     }

//     console.log(component,"component")
//   }, [userData]);
  
//   //const {isListening,recognizedText,startRecognition,stopRecognition} = useContext(VoiceContext)
//   const navigate = useNavigate();
//   const [recognizedText, setRecognizedText] = useState('');
//   const [isListening, setIsListening] = useState(false);
//   const [recognition, setRecognition] = useState(null);

//   // Initialize voice recognition
//   const initializeRecognition = () => {
//     if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
//       console.error('Speech recognition not supported in this browser.');
//       return;
//     }

//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     const recognitionInstance = new SpeechRecognition();

//     recognitionInstance.lang ='En-IN'; // Language for recognition (Hindi)
//     recognitionInstance.continuous = false; // Keep listening continuously
//     recognitionInstance.interimResults = false; // Don't show intermediate results
//     recognitionInstance.maxAlternatives = 1; // Return the most likely result

//     // Set the recognition instance
//     setRecognition(recognitionInstance);

//     recognitionInstance.onstart = () => {
//       console.log('Speech recognition started.');
//       setIsListening(true);
//     };

//     recognitionInstance.onend = () => {
//       console.log('Speech recognition ended.');
//       setIsListening(false);
//       // Restart recognition automatically for continuous listening
//       recognitionInstance.start();
//     };

//     recognitionInstance.onerror = (event) => {
//       console.error('Speech recognition error:', event);
//       setIsListening(false);
//       // Restart recognition if an error occurs that isn't a manual stop
//       if (event.error !== 'no-speech') {
//         recognitionInstance.start();
//       }
//     };

//     recognitionInstance.onresult = (event) => {
//       const transcript = event.results[event.resultIndex][0].transcript.trim();
//       console.log('Recognized text:', transcript);
//       setRecognizedText(transcript.toLowerCase());

//       // Process the recognized text and generate a response
//       processCommand(transcript.toLowerCase());
//     };
//   };

//   // Start voice recognition
//   const startRecognition = () => {
//     if (recognition) {
//       recognition.start();
//       console.log('Starting speech recognition...');
//     } else {
//       console.error('Speech recognition instance not available.');
//     }
//   };

//   // Stop voice recognition
//   const stopRecognition = () => {
//     if (recognition) {
//       recognition.stop();
//       console.log('Stopping speech recognition...');
//     }
//   };

//   // Function to process recognized commands
//   const processCommand = 
//     (command) => {
//     let response = '';
//     // Mapping for number words to digits
//   const numberWords = {
//     one: 1,
//     two: 2,
//     to:2,
//     three: 3,
//     four: 4,
//     for:4,
//     five: 5,
//     5:5,
//     six: 6,
//     seven: 7,
//     eight: 8,
//     nine: 9,
//     ten: 10,
//   };

//   if (component == 'address'){

//           if (command.includes('read the addresses') || command.includes('read address') || command.includes('can you read the addresses')) {

//             const currentAddresses = addressRef.current; // Access the latest addresses from the ref
//             console.log(currentAddresses, "voice address"); // Debug the latest address state
//             if (Array.isArray(currentAddresses) && currentAddresses.length > 0) {
//               response = `You have ${currentAddresses.length} addresses. `;
//               currentAddresses.forEach((addr, index) => {
//                 response += `Address ${index + 1}:  ${addr.houseNo}, ${addr.locality},${addr.city}, ${addr.state}). `;
//               });
//               speak(response);
//             } else {
//               response = "Your address list is empty.";
//               speak(response);
//             }
            
//           }
//           else if (command.includes('select address') || command.includes('select one') || command.includes('one')) {
//             // Extract the number from the command
//             const match = command.match(/(one|to|two|three|four|for|five|six|seven|eight|nine|ten|5|\d+)/); 
//                   if (match) {
//               const word = match[1].toLowerCase(); // Convert to lowercase for consistent matching
//               const addressIndex = numberWords[word] ? numberWords[word] - 1 : -1; // Convert word to index
//               const currentAddresses = addressRef.current;
        
//               if (addressIndex >= 0 && addressIndex < currentAddresses.length) {
//                 const selected = currentAddresses[addressIndex];
//                 setSelectedAddress(selected);
//                 // Update selected address
//                 response = `You have selected Address ${addressIndex + 1}:${selected.houseNo}, ${selected.locality},${selected.city}, ${selected.state}.`;
//                 handleship(selected);
//                 console.log("Selected Address:", selected);
        
//                 // Optional: Perform action with the selected address
//                 // navigate('/checkout', { state: { selectedAddress: selected } });
//               } else {
//                 response = `I couldn't find Address ${word}. Please try again.`;
//               }
//             } else {
//               response = `Please specify which address to select, like 'select address one'.`;
//             }
//             speak(response);
//           }
//   }
//   else if (command.includes(' add to cart ')) {
//       response = 'The item has been added to your cart.';
//     } else if (command.includes('wishlist')) {
//       response = 'The item has been added to your wishlist.';
//     }
//     else if (command.includes('good morning')) {
//       response = 'Good morning sir!,,,,,,,,,, nice to meet you';
//     }
//     else if (command.includes('good evening')) {
//       response = 'Good evening sir how was the day!,,,,,, Hope it was a great day';
//     } else if (command.includes('search')) {
//       response = 'I will search for the item for you.';
//     }
//   else if (command.includes('go to car') || command.includes('open card') || command.includes('got to cart')) 
//     { response = 'Moving to cart.'; 
//     navigate('/home/cart'); 
//   }
//   else if (command.includes('go to wish list') || command.includes('open wish list') || command.includes('go to wish') ||command.includes('open wishes') ||command.includes('wish list')) 
//     { response = 'Moving to wish list.'; 
//     navigate('/home/wishlist'); 
//     }
//   else if (command.includes('go to house') || command.includes(' house') || command.includes('show me house') ||command.includes('show me house products')) 
//     { response = 'letting you to house products.'; 
//     navigate('/home/house/living'); 
//   }
//   else if (command.includes('go to office') || command.includes('open office section') || command.includes('show me office products') ||command.includes('office')) 
//     { response = 'we are going to look office products'; 
//     navigate('/home/office/conference'); 
//   }
//   else if (command.includes('show kitchen items') || command.includes('show kitchen products') || command.includes('kitchen') ||command.includes('lets move to kitchen')) 
//     { response = 'Okay we are going to look some kitchen Gadgets'; 
//     navigate('/home/house/kitchen'); 
//   }
//   else if (command.includes('show living room items') || command.includes('show kitchen products') || command.includes('living room') ||command.includes('lets move to living')) 
//     { response = 'Okay we are going to look some living area Gadgets'; 
//     navigate('/home/house/living'); 
//   }
//   else if (command.includes('show bath room products') || command.includes('show bath room products') || command.includes('washroom')||command.includes('bathroom') ||command.includes('lets move to bathroom')) 
//     { response = 'Okay we are going to look some bathroom Gadgets'; 
//     navigate('/home/house/bathroom'); 
//   }
//   else if (command.includes('show bed room items') || command.includes('bedroom products') || command.includes('bedroom') ||command.includes('lets move to bedroom')) 
//     { response = 'Okay we are going to look some bed room Gadgets'; 
//     navigate('/home/house/bedroom'); 
//   }
//   else if (command.includes('show security items') || command.includes('show security products') || command.includes('security') ||command.includes('lets move to security')) 
//     { response = 'Okay we are going to look some security  Gadgets'; 
//     navigate('/home/office/security'); 
//   }
//   else if (command.includes('proceed to check out') || command.includes('checkout') || command.includes('check out') ||command.includes('lets check out')) 
//     { response = 'Okay we are proceeding to check out your cart items...'; 
//     navigate('/home/cart/address'); 
//   }
//   else {
//       response = 'I did not understand.';// Pause for 1 second before speaking again
//   }

//     console.log('Response:', response);
//     speak(response); // Call the speak function to respond via speech synthesis
//   }


//   //speak function 
//   const speak = (text) => {
//     if ('speechSynthesis' in window) {
//       console.log(`Speaking: ${text}`);
  
//       // Stop any ongoing speech
//       window.speechSynthesis.cancel();
  
//       // Split the text into chunks at full stops
//       const chunks = text.split(/(?<=\.)\s+/); // Split by sentences (keep full stops)
  
//       let currentChunkIndex = 0;
  
//       const speakChunk = () => {
//         if (currentChunkIndex < chunks.length) {
//           const chunk = chunks[currentChunkIndex];
//           const utterance = new SpeechSynthesisUtterance(chunk);
  
//           utterance.lang = 'en-IN'; // Language for the spoken response (English - India)
//           utterance.pitch = 1; // Normal pitch
//           utterance.rate = 1.2; // Normal speed
//           utterance.volume = 1; // Full volume
  
//           utterance.onstart = () => {
//             console.log(`Speaking chunk ${currentChunkIndex + 1}/${chunks.length}: ${chunk}`);
//           };
  
//           utterance.onend = () => {
//             console.log('Speech synthesis chunk ended.');
//             currentChunkIndex++;
//             speakChunk(); // Speak the next chunk
//           };
  
//           utterance.onerror = (event) => {
//             console.error('Speech synthesis error:', event);
//           };
  
//           window.speechSynthesis.speak(utterance); // Start speaking the chunk
//         }
//       };
  
//       speakChunk(); // Start speaking the first chunk
//     } else {
//       console.error('Speech synthesis is not supported in this browser.');
//     }
//   };
  


// // Automatically initialize speech recognition on component mount
// useEffect(() => {
//   initializeRecognition();
// }, [component]);




//   return (
//     <>
    
//     <div>
//       <h1>Voice Assisted E-commerce</h1>
//       <p>{isListening ? 'Listening...' : 'Click to start listening'}</p>
//       <p>Recognized Command: {recognizedText}</p>
//       <button onClick={startRecognition}>Start Voice Recognition</button>
//       <button onClick={stopRecognition}>Stop Voice Recognition</button>
//     </div>
//     <div className='voice-assist'>
//     <FaMicrophone />
//     </div>
//     </>
//   );
// };

// export default VoiceAssistedEcommerce;



// import React, { useContext, useEffect, useState, useRef } from 'react';
// import './VoiceAssists.css';
// import { FaMicrophone } from "react-icons/fa6";
// import { useNavigate } from 'react-router-dom';
// import { ShopContext } from '../../context/shopContext';

// const VoiceAssistedEcommerce = () => {
//   const { userData, component, handleship } = useContext(ShopContext);
//   const [selectedAddress, setSelectedAddress] = useState(null);
//   const [address, setAddress] = useState([]);
//   const [orders, setOrders] = useState([]);
//   const addressRef = useRef([]);
//   const orderRef = useRef([]);
//   const navigate = useNavigate();

//   const [recognizedText, setRecognizedText] = useState('');
//   const [isListening, setIsListening] = useState(false);
//   const [recognition, setRecognition] = useState(null);

//   // Initialize address and order data from userData
//   useEffect(() => {
//     if (Array.isArray(userData?.address) && userData.address.length > 0) {
//       setAddress(userData.address);
//       addressRef.current = userData.address;
//       console.log("Address set to:", userData.address);
//     } else {
//       console.log("No valid addresses found.");
//     }

//     if (Array.isArray(userData?.Order) && userData.Order.length > 0) {
//       setOrders(userData.Order);
//       orderRef.current = userData.Order;
//       console.log("Order set to:", userData.Order);
//     } else {
//       console.log("No valid order found.");
//     }
//   }, [userData]);

//   // Initialize voice recognition
//   const initializeRecognition = () => {
//     if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
//       console.error('Speech recognition not supported in this browser.');
//       return;
//     }

//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     const recognitionInstance = new SpeechRecognition();

//     recognitionInstance.lang = 'En-IN'; // Language for recognition (Hindi)
//     recognitionInstance.continuous = false;
//     recognitionInstance.interimResults = false;
//     recognitionInstance.maxAlternatives = 1;

//     setRecognition(recognitionInstance);

//     recognitionInstance.onstart = () => {
//       console.log('Speech recognition started.');
//       setIsListening(true);
//     };

//     recognitionInstance.onend = () => {
//       console.log('Speech recognition ended.');
//       setIsListening(false);
//       // Restart recognition automatically if needed:
//       recognitionInstance.start();
//     };

//     recognitionInstance.onerror = (event) => {
//       console.error('Speech recognition error:', event);
//       setIsListening(false);
//       if (event.error !== 'no-speech') {
//         recognitionInstance.start();
//       }
//     };

//     recognitionInstance.onresult = (event) => {
//       const transcript = event.results[event.resultIndex][0].transcript.trim().toLowerCase();
//       console.log('Recognized text:', transcript);
//       setRecognizedText(transcript);
//       processCommand(transcript);
//     };
//   };

//   const startRecognition = () => {
//     if (recognition) {
//       recognition.start();
//       console.log('Starting speech recognition...');
//     } else {
//       console.error('Speech recognition instance not available.');
//     }
//   };

//   const stopRecognition = () => {
//     if (recognition) {
//       recognition.stop();
//       console.log('Stopping speech recognition...');
//     }
//   };

//   // Function to process recognized commands
//   const processCommand = (command) => {
//     let response = '';
//     // Mapping for number words to digits
//     const numberWords = {
//       one: 1,
//       two: 2,
//       to: 2,
//       three: 3,
//       four: 4,
//       for: 4,
//       five: 5,
//       5: 5,
//       six: 6,
//       seven: 7,
//       eight: 8,
//       nine: 9,
//       ten: 10,
//     };

//     if (component === 'address') {
//       if (command.includes('read the addresses') || command.includes('read address') || command.includes('can you read the addresses')) {
//         const currentAddresses = addressRef.current;
//         console.log(currentAddresses, "voice address");
//         if (Array.isArray(currentAddresses) && currentAddresses.length > 0) {
//           response = `You have ${currentAddresses.length} addresses. `;
//           currentAddresses.forEach((addr, index) => {
//             response += `Address ${index + 1}: ${addr.houseNo}, ${addr.locality}, ${addr.city}, ${addr.state}. `;
//           });
//           speak(response);
//         } else {
//           response = "Your address list is empty.";
//           speak(response);
//         }
//       } else if (command.includes('select address') || command.includes('select one') || command.includes('one')) {
//         const match = command.match(/(one|to|two|three|four|for|five|six|seven|eight|nine|ten|5|\d+)/);
//         if (match) {
//           const word = match[1].toLowerCase();
//           const addressIndex = numberWords[word] ? numberWords[word] - 1 : -1;
//           const currentAddresses = addressRef.current;
//           if (addressIndex >= 0 && addressIndex < currentAddresses.length) {
//             const selected = currentAddresses[addressIndex];
//             setSelectedAddress(selected);
//             response = `You have selected Address ${addressIndex + 1}: ${selected.houseNo}, ${selected.locality}, ${selected.city}, ${selected.state}.`;
//             handleship(selected);
//             console.log("Selected Address:", selected);
//           } else {
//             response = `I couldn't find Address ${word}. Please try again.`;
//           }
//         } else {
//           response = `Please specify which address to select, like 'select address one'.`;
//         }
//         speak(response);
//       }
//     }
//     else if (command.includes('search')) {
//       // Instead of a static response, use WebSocket-based search
//       response = 'Initiating product search...';
//       speak(response);
//       handleWebSocketSearch(command);
//     }
//     else if (command.includes(' add to cart ')) {
//       response = 'The item has been added to your cart.';
//       speak(response);
//     }
//     else if (command.includes('wishlist')) {
//       response = 'The item has been added to your wishlist.';
//       speak(response);
//     }
//     else if (command.includes('good morning')) {
//       response = 'Good morning sir! Nice to meet you.';
//       speak(response);
//     }
//     else if (command.includes('good evening')) {
//       response = 'Good evening sir, how was your day? Hope it was great.';
//       speak(response);
//     }
//     else if (command.includes('go to car') || command.includes('open card') || command.includes('got to cart')) {
//       response = 'Moving to cart.';
//       speak(response);
//       navigate('/home/cart');
//     }
//     else if (command.includes('go to wish list') || command.includes('open wish list') || command.includes('go to wish') ||
//              command.includes('open wishes') || command.includes('wish list')) {
//       response = 'Moving to wish list.';
//       speak(response);
//       navigate('/home/wishlist');
//     }
//     else if (command.includes('go to house') || command.includes('house') || command.includes('show me house') ||
//              command.includes('show me house products')) {
//       response = 'Taking you to house products.';
//       speak(response);
//       navigate('/home/house/living');
//     }
//     else if (command.includes('go to office') || command.includes('open office section') || command.includes('show me office products') ||
//              command.includes('office')) {
//       response = 'Moving to office products.';
//       speak(response);
//       navigate('/home/office/conference');
//     }
//     else if (command.includes('show kitchen items') || command.includes('show kitchen products') || command.includes('kitchen') ||
//              command.includes('lets move to kitchen')) {
//       response = 'Looking up some kitchen gadgets.';
//       speak(response);
//       navigate('/home/house/kitchen');
//     }
//     else if (command.includes('show living room items') || command.includes('living room') || command.includes('lets move to living')) {
//       response = 'Let\'s look at some living area gadgets.';
//       speak(response);
//       navigate('/home/house/living');
//     }
//     else if (command.includes('show bath room products') || command.includes('washroom') || command.includes('bathroom') ||
//              command.includes('lets move to bathroom')) {
//       response = 'Checking out some bathroom gadgets.';
//       speak(response);
//       navigate('/home/house/bathroom');
//     }
//     else if (command.includes('show bed room items') || command.includes('bedroom') || command.includes('lets move to bedroom')) {
//       response = 'Taking you to bedroom gadgets.';
//       speak(response);
//       navigate('/home/house/bedroom');
//     }
//     else if (command.includes('show security items') || command.includes('show security products') || command.includes('security') ||
//              command.includes('lets move to security')) {
//       response = 'Let\'s look at some security gadgets.';
//       speak(response);
//       navigate('/home/office/security');
//     }
//     else if (command.includes('proceed to check out') || command.includes('checkout') || command.includes('check out') ||
//              command.includes('lets check out')) {
//       response = 'Proceeding to check out your cart items.';
//       speak(response);
//       navigate('/home/cart/address');
//     }
//     else {
//       response = 'I did not understand.';
//       speak(response);
//     }

//     console.log('Response:', response);
//   };

//   // WebSocket implementation for product search
//   const handleWebSocketSearch = (command) => {
//     // Connect to FastAPI WebSocket to process NLP for search
//     const fastApiSocket = new WebSocket("ws://127.0.0.1:8000/ws");
//     fastApiSocket.onopen = () => {
//       console.log("Connected to FastAPI WebSocket for search");
//       fastApiSocket.send(command);
//     };
//     fastApiSocket.onmessage = (event) => {
//       console.log("Received from FastAPI:", event.data);
//       const nlpResult = JSON.parse(event.data); // Expected: { intent: "search_product", query: "smart watches" }
//       if (nlpResult.intent === "search_product") {
//         // Now connect to Node.js WebSocket for product search results
//         const nodeSocket = new WebSocket("ws://localhost:5001");
//         nodeSocket.onopen = () => {
//           console.log("Connected to Node.js WebSocket for search results");
//           nodeSocket.send(JSON.stringify({ intent: "search_product", query: nlpResult.query }));
//         };
//         nodeSocket.onmessage = (msg) => {
//           console.log("Received from Node.js:", msg.data);
//           // Assume msg.data is a string or JSON with search results
//           speak("I found these products: " + msg.data);
//           nodeSocket.close();
//         };
//         nodeSocket.onerror = (error) => {
//           console.error("Node.js WebSocket error:", error);
//         };
//       }
//       fastApiSocket.close();
//     };
//     fastApiSocket.onerror = (error) => {
//       console.error("FastAPI WebSocket error:", error);
//     };
//   };

//   // Function to synthesize voice (speak the response)
//   const speak = (text) => {
//     if ('speechSynthesis' in window) {
//       console.log(`Speaking: ${text}`);
//       window.speechSynthesis.cancel();

//       // Split the text into chunks at full stops
//       const chunks = text.split(/(?<=\.)\s+/);
//       let currentChunkIndex = 0;

//       const speakChunk = () => {
//         if (currentChunkIndex < chunks.length) {
//           const chunk = chunks[currentChunkIndex];
//           const utterance = new SpeechSynthesisUtterance(chunk);

//           utterance.lang = 'en-IN';
//           utterance.pitch = 1;
//           utterance.rate = 1.2;
//           utterance.volume = 1;

//           utterance.onstart = () => {
//             console.log(`Speaking chunk ${currentChunkIndex + 1}/${chunks.length}: ${chunk}`);
//           };

//           utterance.onend = () => {
//             console.log('Speech synthesis chunk ended.');
//             currentChunkIndex++;
//             speakChunk();
//           };

//           utterance.onerror = (event) => {
//             console.error('Speech synthesis error:', event);
//           };

//           window.speechSynthesis.speak(utterance);
//         }
//       };

//       speakChunk();
//     } else {
//       console.error('Speech synthesis is not supported in this browser.');
//     }
//   };

//   // Automatically initialize speech recognition on component mount
//   useEffect(() => {
//     initializeRecognition();
//   }, [component]);

//   return (
//     <>
//       <div>
//         <h1>Voice Assisted E-commerce</h1>
//         <p>{isListening ? 'Listening...' : 'Click to start listening'}</p>
//         <p>Recognized Command: {recognizedText}</p>
//         <button onClick={startRecognition}>Start Voice Recognition</button>
//         <button onClick={stopRecognition}>Stop Voice Recognition</button>
//       </div>
//       <div className='voice-assist'>
//         <FaMicrophone />
//       </div>
//     </>
//   );
// };

// export default VoiceAssistedEcommerce;







import React, { useState, useEffect, useRef } from 'react';
import './VoiceAssists.css';
import { FaMicrophone } from "react-icons/fa6";

const VoiceAssistedEcommerce = () => {
  const [recognizedText, setRecognizedText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [recognition, setRecognition] = useState(null);
  const wsRef = useRef(null);

  // Initialize WebSocket connection to backend (FastAPI WebSocket endpoint)
  useEffect(() => {
    wsRef.current = new WebSocket("ws://127.0.0.1:8000/ws"); // Adjust the URL if needed

    wsRef.current.onopen = () => {
      console.log("WebSocket connection established");
    };

    wsRef.current.onmessage = (event) => {
      console.log("Received from backend:", event.data);
      try {
        const data = JSON.parse(event.data);
        // Expecting backend to send:
        // { "response": { "intent": "...", "entities": { ... }, "message": "..." } }
        if (data?.response?.message) {
          setResponseMessage(data.response.message);
        }
      } catch (err) {
        console.error("Error parsing WebSocket message", err);
      }
    };

    wsRef.current.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    wsRef.current.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      if (wsRef.current) wsRef.current.close();
    };
  }, []);

  // Initialize Speech Recognition
  useEffect(() => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      console.error('Speech recognition not supported in this browser.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognitionInstance = new SpeechRecognition();
    recognitionInstance.lang = 'en-IN';
    recognitionInstance.continuous = false;
    recognitionInstance.interimResults = false;
    recognitionInstance.maxAlternatives = 1;

    recognitionInstance.onstart = () => {
      console.log("Speech recognition started.");
      setIsListening(true);
    };

    recognitionInstance.onend = () => {
      console.log("Speech recognition ended.");
      setIsListening(false);
    };

    recognitionInstance.onerror = (event) => {
      console.error("Speech recognition error:", event);
      setIsListening(false);
    };

    recognitionInstance.onresult = (event) => {
      const transcript = event.results[event.resultIndex][0].transcript.trim();
      console.log("Recognized text:", transcript);
      setRecognizedText(transcript);
      // Send the recognized text to the backend via WebSocket
      sendMessageToBackend(transcript);
    };

    setRecognition(recognitionInstance);
  }, []);

  // Function to send text via WebSocket
  const sendMessageToBackend = (text) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ text }));
      console.log("Sent to backend:", text);
    } else {
      console.error("WebSocket is not open.");
    }
  };

  const startRecognition = () => {
    if (recognition) {
      recognition.start();
      console.log("Starting speech recognition...");
    }
  };

  const stopRecognition = () => {
    if (recognition) {
      recognition.stop();
      console.log("Stopping speech recognition...");
    }
  };

  return (
    <div className="voice-assisted-container">
      <h1>Voice Assisted E-commerce</h1>
      <div>
        <p>{isListening ? "Listening..." : "Click 'Start Recognition' to speak"}</p>
        <p><strong>Recognized Text:</strong> {recognizedText}</p>
        <p><strong>Backend Response:</strong> {responseMessage}</p>
      </div>
      <div className="controls">
        <button onClick={startRecognition}>Start Recognition</button>
        <button onClick={stopRecognition}>Stop Recognition</button>
      </div>
      <div className="icon">
        <FaMicrophone size={50} />
      </div>
    </div>
  );
};

export default VoiceAssistedEcommerce;
