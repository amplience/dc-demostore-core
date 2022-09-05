import React from 'react';

interface Props {
}

const AddToBasket: React.FC<Props> = (props) => {
    return <div style={{marginTop: 10, width: '100%'}}>
        <button style={{width: '100%'}} type="button" className="af-button af-button-dark">
            ADD TO MY BAG
        </button>
    </div>
};

export default AddToBasket;