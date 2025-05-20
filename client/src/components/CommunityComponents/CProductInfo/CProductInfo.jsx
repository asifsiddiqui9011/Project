import React from 'react';
import './CProductInfo.css'; // Assuming you have a CSS file for styling

const CProductInfo = ({product}) => {

    const [modalOpen, setModalOpen] = React.useState(false);
    const [modalType, setModalType] = React.useState('');
    const [explanation, setExplanation] = React.useState('');
    
    const handleOpenModal = (type) => {
        setModalType(type);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setExplanation('');
    };

    const handleSend = () => {
        // Implement your send logic here (e.g., API call)
        console.log(modalType, explanation);
        handleCloseModal();
    };

    if (!product) {
        return <div className="cproduct-info-container">No product selected</div>;
    }

    return (
        <>
            <div className="cproduct-info-container">
                <div className="cproduct-info-image-wrapper">
                    <img
                        src={''}
                        alt={product.title}
                        className="cproduct-info-image"
                    />
                </div>
                <div className="cproduct-info-details">
                    <h2 className="cproduct-info-title">{product.title}</h2>
                    <p className="cproduct-info-model">
                        <strong>Model Number:</strong> {product.modelNumber}
                    </p>
                    <p className="cproduct-info-id">
                        <strong>Product ID:</strong> {product.id}
                    </p>
                    <p className="cproduct-info-description">{product.description}</p>
                    <div className="cproduct-info-buttons">
                        <button
                            type="button"
                            className="report-issue-button"
                            onClick={() => handleOpenModal('Facing an Issue')}
                        >
                            facing an Issue
                        </button>
                        <button
                            type="button"
                            className="suggest-update-button"
                            onClick={() => handleOpenModal('Suggest an Update')}
                        >
                            Suggest an Update
                        </button>
                    </div>
                </div>
            </div>
            {modalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>{modalType}</h2>
                        <textarea
                            placeholder="Please provide an explanation..."
                            value={explanation}
                            onChange={(e) => setExplanation(e.target.value)}
                        />
                        <button type="button" onClick={handleSend}>
                            Send
                        </button>
                        <button type="button" onClick={handleCloseModal}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default CProductInfo;