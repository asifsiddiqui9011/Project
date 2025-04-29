import "./Orderlist.css"
import { useState, useContext } from "react";
import { AdminContext } from "../../Context/AdminContext";

function Modal({ items, toggle, orderDate, subTotal, total, expectedDate, address }) {
  return (
    <div className="orderlist-model_overlay" onClick={toggle}>
      <div className="orderlist-model_detail" onClick={(e) => e.stopPropagation()}>
        {items.map((item, i) => (
          <div key={i} className="orderlist-model_item">
            <img src={item.image} alt="" className="orderlist-model_item-img" />
            <p>{item.title}</p>
            <p>{item.description}</p>
            <p>{item.quantity}</p>
            <p>RS. {item.price}</p>
          </div>
        ))}
        <div className="orderlist-model_description">
          <p><b>Order Date: </b> {orderDate}</p>
          <p><b>Expected Date: </b> {expectedDate}</p>
          <p><b>Sub Total: </b> Rs. {subTotal}</p>
          <p><b>Total: </b> Rs. {total}</p>
          <p><b>Address: </b>{address.houseNo} {address.locality} {address.city} {address.state} {address.zipCode}</p>
        </div>
      </div>
    </div>
  )
}

function OrderRow({ product, activeModal, toggleModal, refreshOrders }) {
  // Local state for status selection
  const [selectedStatus, setSelectedStatus] = useState(product.Status);

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  }

  const updateStatus = async () => {
    const payload = { id: product._id, status: selectedStatus };
    await fetch(`http://localhost:8080/api/updateorderstatus`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if(data.success){
          alert(`${product._id} Status Updated`);
        }
        else{
          alert("Failed");
        }
      });
    refreshOrders();
  }

  const address = product.Address;
  const payment = product.Payment;
  const items = product.Items;

  return (
    <div>
      <div className="orderlist-row">
        <p className="orderlist-row_orderId">{product._id}</p>
        <p className="orderlist-row_userId">{product.User}</p>
        <p className="orderlist-row_amount">{product.total}</p>
        <p className="orderlist-row_address">{address.city} {address.state} {address.zipCode}</p>
        <p className="orderlist-row_status">{product.Status}</p>
        <select 
          value={selectedStatus} 
          name='status'
          onChange={handleStatusChange} 
          className="orderlist-select_status">
          <option value="ordered">Ordered</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
        </select>
        <button 
          className="orderlist-button_update" 
          onClick={updateStatus}>
          Update
        </button>
        <p className="orderlist-row_orderDate">{product.orderDate}</p>
        <p className="orderlist-row_payment">{payment.status}</p>
        <button 
          className="orderlist-toggle_button" 
          onClick={() => toggleModal(product._id)}>
          {activeModal === product._id ? "Collapse Details" : "Expand Details"}
        </button>
      </div>
      {activeModal === product._id && (
        <Modal 
          key={product._id} 
          items={items} 
          toggle={() => toggleModal(product._id)} 
          orderDate={product.orderDate} 
          expectedDate={product.expectedDate} 
          subTotal={product.subTotal} 
          total={product.total} 
          address={address} 
        />
      )}
      <hr />
    </div>
  );
}

function Orderlist() {
  const { allorders, fetchOrder,user } = useContext(AdminContext);
  const [activeModal, setActiveModal] = useState(null);

  const toggleModal = (id) => {
    if (activeModal === id) {
      setActiveModal(null);
    } else {
      setActiveModal(id);
    }
  };

  // const { allorders, fetchOrder, user } = useContext(AdminContext);
  // const [activeModal, setActiveModal] = useState(null);

  // const toggleModal = (id) => {
  //   if (activeModal === id) {
  //     setActiveModal(null);
  //   } else {
  //     setActiveModal(id);
  //   }
  // };

  // Filter orders if user role is "clerk"
  const filteredOrders = allorders.filter((product) => {
    if (user.role === "clerk") {
      return product.Address.city === user.city;
    }
    return true;
  });

  return (
    <div className="orderlist-container">
      <h1>All Order List</h1>
      <div className="orderlist-header">
        <p className="orderlist-header_order">Order Id</p>
        <p className="orderlist-header_user">User Id</p>
        <p className="orderlist-header_amount">Amount</p>
        <p className="orderlist-header_address">Address</p>
        <p className="orderlist-header_status">Order Status</p>
        <p className="orderlist-header_payment">Payment Status</p>
      </div>
      <div className="orderlist-orders">
        {filteredOrders.map((product, index) => (
          <OrderRow
            key={index}
            product={product}
            activeModal={activeModal}
            toggleModal={toggleModal}
            refreshOrders={fetchOrder}
          />
        ))}
      </div>
    </div>
  );
}

export default Orderlist;
