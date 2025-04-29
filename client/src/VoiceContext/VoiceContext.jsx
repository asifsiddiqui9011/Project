import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import { ShopContext } from '../context/shopContext';

export const VoiceContext = createContext();

export const VoiceProvider = (props) => {
  
  // const {userData} = useContext(ShopContext)
  // const navigate = useNavigate();
  // const [recognizedText, setRecognizedText] = useState('');
  // const [recognition, setRecognition] = useState(null);
  // const [isListening, setIsListening] = useState(false);
  // const address = userData.address;
  // if(address){
  //   console.log(address.length)
  // }

  // // State to store the addresses 
  // const [addresses, setAddresses] = useState([]);
  // useEffect(() => { 
  //   if (userData && Array.isArray(userData.address)) 
  //     { setAddresses(userData.address); 
  //       console.log(addresses,"add")

  //     } else { setAddresses([]); // Clear the state if no valid addresses
  //        } 
  // }, [userData]);
  // // const oldaddress = userData.address
  // // console.log(oldaddress.length)





  // // Initialize voice recognition
  // const initializeRecognition = () => {
  //   if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
  //     console.error('Speech recognition not supported in this browser.');
  //     return;
  //   }

  //   const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  //   const recognitionInstance = new SpeechRecognition();

  //   recognitionInstance.lang = 'En-IN'; // Language for recognition (Hindi)
  //   recognitionInstance.continuous = true; // Keep listening continuously
  //   recognitionInstance.interimResults = false; // Don't show intermediate results
  //   recognitionInstance.maxAlternatives = 1; // Return the most likely result

  //   // Set the recognition instance
  //   setRecognition(recognitionInstance);

  //   recognitionInstance.onstart = () => {
  //     console.log('Speech recognition started.');
  //     setIsListening(true);
  //   };

  //   recognitionInstance.onend = () => {
  //     console.log('Speech recognition ended.');
  //     setIsListening(false);
  //     // Restart recognition automatically for continuous listening
  //     recognitionInstance.start();
  //   };

  //   recognitionInstance.onerror = (event) => {
  //     console.error('Speech recognition error:', event);
  //     setIsListening(false);
  //     // Restart recognition if an error occurs that isn't a manual stop
  //     if (event.error !== 'no-speech') {
  //       recognitionInstance.start();
  //     }
  //   };

  //   recognitionInstance.onresult = (event) => {
  //     const transcript = event.results[event.resultIndex][0].transcript.trim();
  //     console.log('Recognized text:', transcript);
  //     setRecognizedText(transcript);

  //     // Process the recognized text and generate a response
  //     processCommand(transcript);
  //   };
  // };

  // // Start voice recognition
  // const startRecognition = () => {
  //   if (recognition) {
  //     recognition.start();
  //     console.log('Starting speech recognition...');
  //   } else {
  //     console.error('Speech recognition instance not available.');
  //   }
  // };

  // // Stop voice recognition
  // const stopRecognition = () => {
  //   if (recognition) {
  //     recognition.stop();
  //     console.log('Stopping speech recognition...');
  //   }
  // };

  // useEffect(() => { if (addresses.length > 0) { 
  //    const command = recognizedText.toLowerCase(); 
  //    if (command.includes('read the addresses') || command.includes('read address') || command.includes('can you read the addresses')) 
  //     { let response; if (addresses.length > 0) 
  //       { response = `You have ${addresses.length} addresses. `; speak(response); } 
  //       else { response = "Your address is empty."; } 
  //       addresses.forEach((e, index) => 
  //         { response += `Address ${index + 1}: ${e.city}, ${e.state}, ${e.pincode}. `; console.log({index}); }); console.log(response); } } 
  //     }, [addresses, recognizedText]);

  // // Function to process recognized commands
  // const processCommand = (command) => {
  //   let response = '';

  //   if (command.includes(' add to cart ')) {
  //     response = 'The item has been added to your cart.';
  //   } else if (command.includes('wishlist')) {
  //     response = 'The item has been added to your wishlist.';
  //   }
  //   else if (command.includes('good morning')) {
  //     response = 'Good morning sir!,,,,,,,,,, nice to meet you';
  //   }
  //   else if (command.includes('good evening')) {
  //     response = 'Good evening sir how was the day!,,,,,, Hope it was a great day';
  //   } else if (command.includes('search')) {
  //     response = 'I will search for the item for you.';
  //   }
  // else if (command.includes('go to car') || command.includes('open card') || command.includes('got to cart')) 
  //   { response = 'Moving to cart.'; 
  //   navigate('/home/cart'); 
  // }
  // else if (command.includes('go to wish list') || command.includes('open wish list') || command.includes('go to wish') ||command.includes('open wishes') ||command.includes('wish list')) 
  //   { response = 'Moving to wish list.'; 
  //   navigate('/home/wishlist'); 
  // }
  // else if (command.includes('go to wish order') || command.includes('open my orders') || command.includes('check my orders') ||command.includes('check order')) 
  //   { response = 'checking your orders.'; 
  //   navigate('/home/UserProfile'); 
  // }
  // else if (command.includes('go to house') || command.includes(' house') || command.includes('show me house') ||command.includes('show me house products')) 
  //   { response = 'letting you to house products.'; 
  //   navigate('/home/house/living'); 
  // }
  // else if (command.includes('go to office') || command.includes('open office section') || command.includes('show me office products') ||command.includes('office')) 
  //   { response = 'we are going to look office products'; 
  //   navigate('/home/office/conference'); 
  // }
  // else if (command.includes('show kitchen items') || command.includes('show kitchen products') || command.includes('kitchen') ||command.includes('lets move to kitchen')) 
  //   { response = 'Okay we are going to look some kitchen Gadgets'; 
  //   navigate('/home/house/kitchen'); 
  // }
  // else if (command.includes('show living room items') || command.includes('show kitchen products') || command.includes('living room') ||command.includes('lets move to living')) 
  //   { response = 'Okay we are going to look some living area Gadgets'; 
  //   navigate('/home/house/living'); 
  // }
  // else if (command.includes('show bath room products') || command.includes('show bath room products') || command.includes('washroom')||command.includes('bathroom') ||command.includes('lets move to bathroom')) 
  //   { response = 'Okay we are going to look some bathroom Gadgets'; 
  //   navigate('/home/house/bathroom'); 
  // }
  // else if (command.includes('show bed room items') || command.includes('bedroom products') || command.includes('bedroom') ||command.includes('lets move to bedroom')) 
  //   { response = 'Okay we are going to look some bed room Gadgets'; 
  //   navigate('/home/house/bedroom'); 
  // }
  // else if (command.includes('show security items') || command.includes('show security products') || command.includes('security') ||command.includes('lets move to security')) 
  //   { response = 'Okay we are going to look some security  Gadgets'; 
  //   navigate('/home/office/security'); 
  // }
  // else if (command.includes('proceed to check out') || command.includes('checkout') || command.includes('check out') ||command.includes('lets check out')) 
  //   { response = 'Okay we are proceeding to check out your cart items...'; 
  //   navigate('/home/cart/address'); 
  // }
  // else if (command.includes('read the addresses') || command.includes('read address') || command.includes('can you read the addresses')) {
    
  //   // if(addresses.length>0){
  //   //      response = `You have ${address.length} addresses. `;
  //   //      speak(response)
  //   // }else{
  //   //   response="your addressss is empty"
  //   // }
    
      
  //   //   address.forEach((e, index) => {
  //   //     response += `Address ${index + 1}: ${e.city}, ${e.state}, ${e.pincode}. `;
  //   //     console.log({index});
  //   //   })
    
    
  // } 
  
  // else {
  //     response = 'I did not understand the command.';
  //   }

  //   console.log('Response:', response);
  //   speak(response); // Call the speak function to respond via speech synthesis
  // };

  // // Function to synthesize voice (speak the response)
  // const speak = (text) => {
  //   if ('speechSynthesis' in window) {
  //     console.log(`Speaking: ${text}`);

  //     // Stop any ongoing speech
  //     window.speechSynthesis.cancel();

  //     const utterance = new SpeechSynthesisUtterance(text);
  //     utterance.lang = 'hi-IN'; // Language for the spoken response (Hindi)
  //     utterance.pitch = 1; // Normal pitch
  //     utterance.rate = 1; // Normal speed
  //     utterance.volume = 1; // Full volume

  //     utterance.onstart = () => {
  //       console.log('Speech synthesis started.');
  //     };

  //     utterance.onend = () => {
  //       console.log('Speech synthesis ended.');
  //     };

  //     utterance.onerror = (event) => {
  //       console.error('Speech synthesis error:', event);
  //     };

  //     window.speechSynthesis.speak(utterance); // Start speaking
  //   } else {
  //     console.error('Speech synthesis is not supported in this browser.');
  //   }
  // };

  // // Automatically initialize speech recognition on component mount
  // useEffect(() => {
  //   initializeRecognition();
  // }, []);

  //const contextValue = {stopRecognition,startRecognition,recognizedText,isListening}
  const contextValue = {}
  return (
    <VoiceContext.Provider value={contextValue}>
      {props.children}
    </VoiceContext.Provider>
  );
};
