// // import React, { useContext, useState } from 'react';
// // import './Delivery.css';
// // import { AdminContext } from '../../Context/AdminContext';

// // const Delivery = () => {

// //     const{allorders} = useContext(AdminContext)
    
// //     console.log(allorders,"allorders")
    

// //     const updateStatus = (id, newStatus) => {
// //         setDeliveries(prev =>
// //             prev.map(delivery => {
// //                 if (delivery.id === id) {
// //                     const updatedDelivery = { ...delivery, status: newStatus };
// //                     if (newStatus === 'delivered') {
// //                         updatedDelivery.deliveryDate = new Date().toISOString().slice(0, 10);
// //                     } else if (delivery.Status === 'delivered') {
// //                         updatedDelivery.deliveryDate = '';
// //                     }
// //                     return updatedDelivery;
// //                 }
// //                 return delivery;
// //             })
// //         );
// //     };

// //     const updatePaymentStatus = (id, newPaymentStatus) => {
// //         // Update paymentStatus only for cash on delivery orders
// //         setDeliveries(prev =>
// //             prev.map(delivery => 
// //                 delivery.id === id && delivery.paymentMode === 'cash on delivery'
// //                     ? { ...delivery, paymentStatus: newPaymentStatus } 
// //                     : delivery
// //             )
// //         );
// //     };

// //     const handleStatusChange = (id, event) => {
// //         const newStatus = event.target.value;
// //         updateStatus(id, newStatus);
// //     };

// //     const handlePaymentStatusChange = (id, event) => {
// //         const newPaymentStatus = event.target.value;
// //         updatePaymentStatus(id, newPaymentStatus);
// //     };

// //     return (
// //         <div style={{ padding: '20px' }} className="delivery-container">
// //             <h2>Delivery Status Update</h2>
// //             {allorders.map(delivery => (
// //                 <div
// //                     key={delivery.id}
// //                     style={{
// //                         marginBottom: '15px',
// //                         border: '1px solid #ccc',
// //                         padding: '10px'
// //                     }}
// //                     className={`delivery-item-${delivery.id}`}
// //                 >
// //                     <p className={`delivery-order-id-${delivery.id}`}>
// //                         Order ID: {delivery._id}
// //                     </p>
// //                     <h3 className={`delivery-product-${delivery.id}`}>
// //                         Product: {delivery.product}
// //                     </h3>
// //                     <p className={`delivery-address-${delivery.id}`}>
// //                         Address: {delivery.Address.city}
// //                     </p>
// //                     <p className={`delivery-mobile-${delivery.id}`}>
// //                         Mobile: {delivery.phoneNumber}
// //                     </p>
// //                     <p className={`delivery-order-date-${delivery.id}`}>
// //                         Order Date: {delivery.orderDate}
// //                     </p>
// //                     <p className={`delivery-delivery-date-${delivery.id}`}>
// //                         Delivery Date: {delivery.expectedDate || 'N/A'}
// //                     </p>
// //                     <p className={`delivery-current-status-${delivery.id}`}>
// //                         Current Status: {delivery.Status}
// //                     </p>
// //                     <p className={`delivery-payment-status-${delivery.id}`}>
// //                         Payment Status: {delivery.Payment.status || 'N/A'}
// //                     </p>
// //                     <label htmlFor={`status-${delivery.id}`}>Update Status:</label>
// //                     <select
// //                         id={`status-${delivery._id}`}
// //                         name="status"
// //                         value={delivery.Status}
// //                         onChange={(e) => handleStatusChange(delivery.id, e)}
// //                         style={{ marginLeft: '10px', padding: '5px' }}
// //                         className={`delivery-status-select-${delivery.id}`}
// //                     >
// //                         <option value="ordered">Ordered</option>
// //                         <option value="shipped">Shipped</option>
// //                         <option value="delivered">Delivered</option>
// //                     </select>

// //                     {delivery.paymentMode === 'cash on delivery' && (
// //                         <div style={{ marginTop: '10px' }}>
// //                             <p>Payment Mode: {delivery.payment.mode}</p>
// //                             <label htmlFor={`paymentStatus-${delivery.id}`}>
// //                                 Update Payment Status:
// //                             </label>
// //                             <select
// //                                 id={`paymentStatus-${delivery.id}`}
// //                                 name="paymentStatus"
// //                                 value={delivery.payment.status || 'pending'}
// //                                 onChange={(e) => handlePaymentStatusChange(delivery.id, e)}
// //                                 style={{ marginLeft: '10px', padding: '5px' }}
// //                                 className={`delivery-payment-status-select-${delivery.id}`}
// //                             >
// //                                 <option value="pending">Pending</option>
// //                                 <option value="paid">Paid</option>
// //                             </select>
// //                         </div>
// //                     )}
// //                 </div>
// //             ))}
// //         </div>
// //     );
// // };

// // export default Delivery;



// import React, { useContext, useState, useEffect } from 'react';
// import './Delivery.css';
// import { AdminContext } from '../../Context/AdminContext';

// const Delivery = () => {
//   const { allorders } = useContext(AdminContext);

//   // Local state for deliveries to allow status updates.
//   const [deliveries, setDeliveries] = useState([]);
//   // Sorting states.
//   const [sortBy, setSortBy] = useState('orderDate'); // "orderDate" or "deliveryDate"
//   const [sortOrder, setSortOrder] = useState('asc'); // "asc" or "desc"

//   // Synchronize local deliveries with allorders.
//   useEffect(() => {
//     setDeliveries(allorders);
//     console.log('allorders', allorders);
//   }, [allorders]);

//   // Update order status and set delivery date if delivered.
//   const updateStatus = (id, newStatus) => {
//     setDeliveries((prev) =>
//       prev.map((delivery) => {
//         if (delivery._id === id) {
//           const updatedDelivery = { ...delivery, status: newStatus };
//           if (newStatus === 'delivered') {
//             updatedDelivery.deliveryDate = new Date()
//               .toISOString()
//               .slice(0, 10);
//           } else if (delivery.status === 'delivered') {
//             updatedDelivery.deliveryDate = '';
//           }
//           return updatedDelivery;
//         }
//         return delivery;
//       })
//     );
//   };

//   // Update payment status for cash on delivery orders.
//   const updatePaymentStatus = (id, newPaymentStatus) => {
//     setDeliveries((prev) =>
//       prev.map((delivery) =>
//         delivery._id === id && delivery.paymentMode === 'cash on delivery'
//           ? { ...delivery, payment: { ...delivery.payment, status: newPaymentStatus } }
//           : delivery
//       )
//     );
//   };

//   const handleStatusChange = (id, event) => {
//     const newStatus = event.target.value;
//     updateStatus(id, newStatus);
//   };

//   const handlePaymentStatusChange = (id, event) => {
//     const newPaymentStatus = event.target.value;
//     updatePaymentStatus(id, newPaymentStatus);
//   };

//   // Sort the deliveries based on sortBy and sortOrder.
//   const sortedDeliveries = [...deliveries].sort((a, b) => {
//     let dateA, dateB;
//     if (sortBy === 'orderDate') {
//       dateA = new Date(a.orderDate);
//       dateB = new Date(b.orderDate);
//     } else {
//       // Use deliveryDate if available; fallback to expectedDate.
//       dateA = a.deliveryDate
//         ? new Date(a.deliveryDate)
//         : a.expectedDate
//         ? new Date(a.expectedDate)
//         : new Date(0);
//       dateB = b.deliveryDate
//         ? new Date(b.deliveryDate)
//         : b.expectedDate
//         ? new Date(b.expectedDate)
//         : new Date(0);
//     }
//     return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
//   });

//   return (
//     <div className="delivery-container" style={{ padding: '20px' }}>
//       <h2>Delivery Status Update</h2>

//       {/* Sorting Controls */}
//       <div className="sort-controls">
//         <label htmlFor="sortBy">
//           Sort By:&nbsp;
//           <select
//             id="sortBy"
//             value={sortBy}
//             onChange={(e) => setSortBy(e.target.value)}
//           >
//             <option value="orderDate">Order Date</option>
//             <option value="deliveryDate">Delivery Date</option>
//           </select>
//         </label>
//         &nbsp;&nbsp;
//         <label htmlFor="sortOrder">
//           Order:&nbsp;
//           <select
//             id="sortOrder"
//             value={sortOrder}
//             onChange={(e) => setSortOrder(e.target.value)}
//           >
//             <option value="asc">Ascending</option>
//             <option value="desc">Descending</option>
//           </select>
//         </label>
//       </div>

//       {/* Delivery details in table format */}
//       <div className="delivery-table-wrapper">
//         <table className="delivery-table">
//           <thead>
//             <tr>
//               <th>Order ID</th>
//               <th>Product</th>
//               <th>City</th>
//               <th>Mobile</th>
//               <th>Order Date</th>
//               <th>Delivery Date</th>
//               <th>Status</th>
//               <th>Payment Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {sortedDeliveries.map((delivery) => (
//               <tr key={delivery._id}>
//                 <td>{delivery._id}</td>
//                 <td>{delivery.product}</td>
//                 <td>{delivery.Address?.city}</td>
//                 <td>{delivery.phoneNumber}</td>
//                 <td>
//                   {delivery.orderDate
//                     ? new Date(delivery.orderDate).toLocaleDateString(undefined, {
//                         year: 'numeric',
//                         month: 'short',
//                         day: 'numeric'
//                       })
//                     : 'N/A'}
//                 </td>
//                 <td>
//                   {delivery.deliveryDate
//                     ? new Date(delivery.deliveryDate).toLocaleDateString(undefined, {
//                         year: 'numeric',
//                         month: 'short',
//                         day: 'numeric'
//                       })
//                     : delivery.expectedDate || 'N/A'}
//                 </td>
//                 <td>
//                   <select
//                     value={delivery.status}
//                     onChange={(e) => handleStatusChange(delivery._id, e)}
//                   >
//                     <option value="ordered">Ordered</option>
//                     <option value="shipped">Shipped</option>
//                     <option value="delivered">Delivered</option>
//                   </select>
//                 </td>
//                 <td>
//                   {delivery.paymentMode === 'cash on delivery' ? (
//                     <div>
//                       <p>{delivery.payment?.status || 'pending'}</p>
//                       <select
//                         value={delivery.payment?.status || 'pending'}
//                         onChange={(e) => handlePaymentStatusChange(delivery._id, e)}
//                       >
//                         <option value="pending">Pending</option>
//                         <option value="paid">Paid</option>
//                       </select>
//                     </div>
//                   ) : (
//                     'N/A'
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Delivery;




// import React, { useContext, useState, useEffect } from 'react';
// import './Delivery.css';
// import { AdminContext } from '../../Context/AdminContext';

// const Delivery = () => {
//   const { allorders } = useContext(AdminContext);

//   // Local state to manage orders and the currently expanded order row.
//   const [deliveries, setDeliveries] = useState([]);
//   const [expandedOrderId, setExpandedOrderId] = useState(null);

//   // Sorting controls.
//   const [sortBy, setSortBy] = useState('orderDate'); // "orderDate" or "deliveryDate"
//   const [sortOrder, setSortOrder] = useState('asc');   // "asc" or "desc"

//   // Synchronize with orders coming from context.
//   useEffect(() => {
//     setDeliveries(allorders);
//   }, [allorders]);

//   // Update the order status.
//   const updateStatus = (id, newStatus) => {
//     setDeliveries((prev) =>
//       prev.map((order) => {
//         if (order._id === id) {
//           const updatedOrder = { ...order, Status: newStatus };
//           if (newStatus === 'delivered') {
//             updatedOrder.deliveryDate = new Date().toISOString().slice(0, 10);
//           } else if (order.Status === 'delivered') {
//             updatedOrder.deliveryDate = '';
//           }
//           return updatedOrder;
//         }
//         return order;
//       })
//     );
//   };

//   // Update payment status (for cash on delivery orders).
//   const updatePaymentStatus = (id, newPaymentStatus) => {
//     setDeliveries((prev) =>
//       prev.map((order) =>
//         order._id === id && order.Payment && order.Payment.mode === 'cash on delivery'
//           ? { ...order, Payment: { ...order.Payment, status: newPaymentStatus } }
//           : order
//       )
//     );
//   };

//   const handleStatusChange = (id, e) => {
//     updateStatus(id, e.target.value);
//   };

//   const handlePaymentStatusChange = (id, e) => {
//     updatePaymentStatus(id, e.target.value);
//   };

//   // Toggle expanded row to show or hide additional details.
//   const toggleExpand = (id) => {
//     setExpandedOrderId(expandedOrderId === id ? null : id);
//   };

//   // Sort deliveries based on sortBy and sortOrder.
//   const sortedDeliveries = [...deliveries].sort((a, b) => {
//     let dateA, dateB;
//     if (sortBy === 'orderDate') {
//       dateA = new Date(a.orderDate);
//       dateB = new Date(b.orderDate);
//     } else {
//       dateA = a.deliveryDate
//         ? new Date(a.deliveryDate)
//         : a.expectedDate
//         ? new Date(a.expectedDate)
//         : new Date(0);
//       dateB = b.deliveryDate
//         ? new Date(b.deliveryDate)
//         : b.expectedDate
//         ? new Date(b.expectedDate)
//         : new Date(0);
//     }
//     return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
//   });

//   // Helper function to join shipping address fields in one line.
//   const getFullAddress = (address) => {
//     if (!address) return 'N/A';
//     const parts = [];
//     if (address.category) parts.push(address.category);
//     if (address.houseNo) parts.push(address.houseNo);
//     if (address.locality) parts.push(address.locality);
//     if (address.city) parts.push(address.city);
//     if (address.state) parts.push(address.state);
//     if (address.zipCode) parts.push(address.zipCode);
//     const addressLine = parts.join(', ');
//     return `${addressLine}${address.mobile ? ' | Mobile: ' + address.mobile : ''}`;
//   };

//   return (
//     <div className="delivery-container" style={{ padding: '20px' }}>
//       <h2>Delivery Status Update</h2>

//       {/* Sorting Controls */}
//       <div className="sort-controls">
//         <label htmlFor="sortBy">
//           Sort By:&nbsp;
//           <select id="sortBy" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
//             <option value="orderDate">Order Date</option>
//             <option value="deliveryDate">Delivery Date</option>
//           </select>
//         </label>
//         &nbsp;&nbsp;
//         <label htmlFor="sortOrder">
//           Order:&nbsp;
//           <select id="sortOrder" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
//             <option value="asc">Ascending</option>
//             <option value="desc">Descending</option>
//           </select>
//         </label>
//       </div>

//       {/* Main Orders Table */}
//       <div className="delivery-table-wrapper">
//         <table className="delivery-table">
//           <thead>
//             <tr>
//               <th>Order ID</th>
//               <th>Order Date</th>
//               <th>Delivery/Expected Date</th>
//               <th>Status</th>
//               <th>Payment</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {sortedDeliveries.map((order) => (
//               <React.Fragment key={order._id}>
//                 <tr>
//                   <td>{order._id}</td>
//                   <td>
//                     {order.orderDate
//                       ? new Date(order.orderDate).toLocaleDateString(undefined, {
//                           year: 'numeric',
//                           month: 'short',
//                           day: 'numeric',
//                         })
//                       : 'N/A'}
//                   </td>
//                   <td>
//                     {order.deliveryDate
//                       ? new Date(order.deliveryDate).toLocaleDateString(undefined, {
//                           year: 'numeric',
//                           month: 'short',
//                           day: 'numeric',
//                         })
//                       : order.expectedDate || 'N/A'}
//                   </td>
//                   <td>
//                     <select value={order.Status} onChange={(e) => handleStatusChange(order._id, e)}>
//                       <option value="ordered">Ordered</option>
//                       <option value="shipped">Shipped</option>
//                       <option value="delivered">Delivered</option>
//                     </select>
//                   </td>
//                   <td>
//                     {order.Payment ? (
//                       order.Payment.mode === 'cash on delivery' ? (
//                         <div>
//                           <p>{order.Payment.status || 'pending'}</p>
//                           <select
//                             value={order.Payment.status || 'pending'}
//                             onChange={(e) => handlePaymentStatusChange(order._id, e)}
//                           >
//                             <option value="pending">Pending</option>
//                             <option value="paid">Paid</option>
//                           </select>
//                         </div>
//                       ) : (
//                         `${order.Payment.mode} (${order.Payment.status})`
//                       )
//                     ) : (
//                       'N/A'
//                     )}
//                   </td>
//                   <td>
//                     <button onClick={() => toggleExpand(order._id)}>
//                       {expandedOrderId === order._id ? 'Collapse' : 'Expand'}
//                     </button>
//                   </td>
//                 </tr>
//                 {expandedOrderId === order._id && (
//                   <tr className="expanded-row">
//                     <td colSpan="6">
//                       {/* Ordered Items Section */}
//                       <div className="order-section">
//                         <h3>Ordered Items</h3>
//                         <table className="details-table">
//                           <thead>
//                             <tr>
//                               <th>Product Name</th>
//                               <th>Price (₹)</th>
//                               <th>Quantity</th>
//                               <th>Image</th>
//                             </tr>
//                           </thead>
//                           <tbody>
//                             {order.Items &&
//                               order.Items.map((item) => (
//                                 <tr key={item._id}>
//                                   <td>{item.title}</td>
//                                   <td>{item.price}</td>
//                                   <td>{item.quantity}</td>
//                                   <td>
//                                     {item.image ? (
//                                       <img
//                                         src={item.image}
//                                         alt={item.title}
//                                         style={{
//                                           width: '50px',
//                                           height: '50px',
//                                           objectFit: 'cover',
//                                         }}
//                                       />
//                                     ) : (
//                                       'N/A'
//                                     )}
//                                   </td>
//                                 </tr>
//                               ))}
//                           </tbody>
//                         </table>
//                       </div>

//                       {/* Order Pricing Section */}
//                       <div className="order-section">
//                         <h3>Pricing Details</h3>
//                         <table className="details-table">
//                           <tbody>
//                             <tr>
//                               <td><strong>Subtotal:</strong></td>
//                               <td>{order.subTotal}</td>
//                             </tr>
//                             <tr>
//                               <td><strong>Total:</strong></td>
//                               <td>{order.total}</td>
//                             </tr>
//                           </tbody>
//                         </table>
//                       </div>

//                       {/* Shipping Address Section */}
//                       <div className="order-section">
//                         <h3>Shipping Address</h3>
//                         <p>{getFullAddress(order.Address)}</p>
//                       </div>
//                     </td>
//                   </tr>
//                 )}
//               </React.Fragment>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Delivery;



import React, { useContext, useState, useEffect } from 'react';
import './Delivery.css';
import { AdminContext } from '../../Context/AdminContext';

const Delivery = () => {
  const { allorders,user } = useContext(AdminContext);

  console.log(allorders, "allorders")

  // Local state to manage orders and the currently expanded order row.
  const [deliveries, setDeliveries] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  // Sorting controls.
  const [sortBy, setSortBy] = useState('orderDate'); // "orderDate" or "deliveryDate"
  const [sortOrder, setSortOrder] = useState('asc');   // "asc" or "desc"
   console.log(deliveries, "deliveries",user)
  // Synchronize with orders coming from context.
  useEffect(() => {
    if (user && user.role === "delivery boy") {
      setDeliveries(allorders.filter(order => order.deliveryBoy === user.id));
    } else {
      setDeliveries(allorders);
    }
  }, [allorders]);

  // Update the order status.
  const updateStatus = (id, newStatus) => {
    setDeliveries((prev) =>
      prev.map((order) => {
        if (order._id === id) {
          const updatedOrder = { ...order, Status: newStatus };
          if (newStatus === 'delivered') {
            updatedOrder.deliveryDate = new Date().toISOString().slice(0, 10);
          } else if (order.Status === 'delivered') {
            updatedOrder.deliveryDate = '';
          }
          return updatedOrder;
        }
        return order;
      })
    );
  };

  // Update payment status (for cash on delivery orders).
  const updatePaymentStatus = (id, newPaymentStatus) => {
    setDeliveries((prev) =>
      prev.map((order) =>
        order._id === id && order.Payment && order.Payment.mode === 'Cash on Delivery'
          ? { ...order, Payment: { ...order.Payment, status: newPaymentStatus } }
          : order
      )
    );
  };

  const handleStatusChange = (id, e) => {

    updateStatus(id, e.target.value);
    (async () => {
      const payload = { id, status: e.target.value };
      await fetch('http://localhost:8080/api/updateorderstatus', {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data.success) {
            alert(`${id} Status Updated`);
          } else {
            alert("Failed");
          }
        });
      refreshOrders();
    })();
  };

  const handlePaymentStatusChange = (id, e) => {
    updatePaymentStatus(id, e.target.value);
    (async () => {
      const payload = { id, paymentStatus: e.target.value };
      await fetch('http://localhost:8080/api/updatePaymentStatus', {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data.success) {
            alert(`${id} Payment Status Updated`);
          } else {
            alert("Failed to update payment status");
          }
        });
      refreshOrders();
    })();
  };

  // Toggle expanded row to show or hide additional details.
  const toggleExpand = (id) => {
    setExpandedOrderId(expandedOrderId === id ? null : id);
  };

  // Sort deliveries based on selected sortBy and sortOrder.
  const sortedDeliveries = [...deliveries].sort((a, b) => {
    let dateA, dateB;
    if (sortBy === 'orderDate') {
      dateA = new Date(a.orderDate);
      dateB = new Date(b.orderDate);
    } else {
      dateA = a.deliveryDate
        ? new Date(a.deliveryDate)
        : a.expectedDate
        ? new Date(a.expectedDate)
        : new Date(0);
      dateB = b.deliveryDate
        ? new Date(b.deliveryDate)
        : b.expectedDate
        ? new Date(b.expectedDate)
        : new Date(0);
    }
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });

  // Helper function to join shipping address fields into one line.
  const getFullAddress = (address) => {
    if (!address) return 'N/A';
    const parts = [];
    if (address.category) parts.push(address.category);
    if (address.houseNo) parts.push(address.houseNo);
    if (address.locality) parts.push(address.locality);
    if (address.city) parts.push(address.city);
    if (address.state) parts.push(address.state);
    if (address.zipCode) parts.push(address.zipCode);
    const addressLine = parts.join(', ');
    return `${addressLine}${address.mobile ? ' | Mobile: ' + address.mobile : ''}`;
  };

  return (
    <div className="delivery-container" style={{ padding: '20px' }}>
      <h2>Delivery Status Update</h2>

      {/* Sorting Controls */}
      <div className="sort-controls">
        <label htmlFor="sortBy">
          Sort By:&nbsp;
          <select id="sortBy" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="orderDate">Order Date</option>
            <option value="deliveryDate">Delivery Date</option>
          </select>
        </label>
        &nbsp;&nbsp;
        <label htmlFor="sortOrder">
          Order:&nbsp;
          <select id="sortOrder" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
      </div>

      {/* Main Orders Table */}
      <div className="delivery-table-wrapper">
        <table className="delivery-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Order Date</th>
              <th>Delivery/Expected Date</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedDeliveries.map((order) => (
              <React.Fragment key={order._id}>
                <tr>
                  <td>{order._id}</td>
                  <td>
                    {order.orderDate
                      ? new Date(order.orderDate).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })
                      : 'N/A'}
                  </td>
                  <td>
                    {order.deliveryDate
                      ? new Date(order.deliveryDate).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })
                      : order.expectedDate || 'N/A'}
                  </td>
                  <td>
                    <select
                      value={order.Status}
                      onChange={(e) => handleStatusChange(order._id, e)}
                    >
                      <option value="ordered">Ordered</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </td>
                  <td>
                    {order.Payment ? (
                      order.Payment.mode === 'Cash on Delivery' ? (
                        <div>
                          <p>{order.Payment.status || 'pending'}</p>
                          <select
                            value={order.Payment.status || 'pending'}
                            onChange={(e) => handlePaymentStatusChange(order._id, e)}
                          >
                            <option value="pending">Pending</option>
                            <option value="paid">Paid</option>
                          </select>
                        </div>
                      ) : (
                        `${order.Payment.mode} (${order.Payment.status})`
                      )
                    ) : (
                      'N/A'
                    )}
                  </td>
                  <td>
                    <button onClick={() => toggleExpand(order._id)}>
                      {expandedOrderId === order._id ? 'Collapse' : 'Expand'}
                    </button>
                  </td>
                </tr>
                {expandedOrderId === order._id && (
                  <tr className="expanded-row">
                    <td colSpan="6">
                      {/* Ordered Items Section */}
                      <div className="order-section">
                        <h3>Ordered Items</h3>
                        <table className="details-table">
                          <thead>
                            <tr>
                              <th>Product Name</th>
                              <th>Price (₹)</th>
                              <th>Quantity</th>
                              <th>Image</th>
                            </tr>
                          </thead>
                          <tbody>
                            {order.Items &&
                              order.Items.map((item) => (
                                <tr key={item._id}>
                                  <td>{item.title}</td>
                                  <td>{item.price}</td>
                                  <td>{item.quantity}</td>
                                  <td>
                                    {item.image ? (
                                      <img
                                        src={item.image}
                                        alt={item.title}
                                        style={{
                                          width: '50px',
                                          height: '50px',
                                          objectFit: 'cover',
                                        }}
                                      />
                                    ) : (
                                      'N/A'
                                    )}
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Pricing Details Section */}
                      <div className="order-section">
                        <h3>Pricing Details</h3>
                        <table className="details-table">
                          <tbody>
                            <tr>
                              <td><strong>Subtotal:</strong></td>
                              <td>{order.subTotal}</td>
                            </tr>
                            <tr>
                              <td><strong>Total:</strong></td>
                              <td>{order.total}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      {/* Payment Details Section */}
                      <div className="order-section">
                        <h3>Payment Details</h3>
                        <table className="details-table">
                          <tbody>
                            <tr>
                              <td><strong>Payment Mode:</strong></td>
                              <td>{order.Payment ? order.Payment.mode : 'N/A'}</td>
                            </tr>
                            <tr>
                              <td><strong>Payment Status:</strong></td>
                              <td>{order.Payment ? order.Payment.status : 'N/A'}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      {/* Shipping Address Section */}
                      <div className="order-section">
                        <h3>Shipping Address</h3>
                        <p>{getFullAddress(order.Address)}</p>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Delivery;