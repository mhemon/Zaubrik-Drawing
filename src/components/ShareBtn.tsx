import React, { useState } from 'react';

const ShareBtn = ({ tldrawApp }) => {
    const [imageUrl, setImageUrl] = useState(null);

    const shareHandler = async (event) => {
        event.preventDefault(); // This might cause the warning if the event listener is passive
        try {
            if (navigator.share && imageUrl) {
                await navigator.share({
                    title: 'Shared TL Draw',
                    text: 'Check out this TL draw!',
                    url: imageUrl,
                });
                console.log('Thanks for sharing!');
            } else {
                console.log('Web Share API not supported or image not available.');
                // Handle the case where Web Share API is not supported or image is not available
            }
        } catch (error) {
            console.error('Error sharing:', error);
        }
    };

    const exportAsImage = () => {
        tldrawApp.export('png').then((blob) => {
            const url = URL.createObjectURL(blob);
            setImageUrl(url);
        }).catch(error => {
            console.error('Error exporting as image:', error);
        });
    };

    return (
        <div style={{ position: 'fixed', top: '20px', right: '10%' , zIndex: 1000}}>
            <button style={{ backgroundColor: 'blue', color: 'white', border: 'none', padding: '10px 20px', fontSize: '16px', cursor: 'pointer', borderRadius: '5px', outline: 'none' }} onClick={exportAsImage}>Export as Image</button>
            <button style={{ backgroundColor: 'blue', color: 'white', border: 'none', padding: '10px 20px', fontSize: '16px', cursor: 'pointer', borderRadius: '5px', outline: 'none', marginLeft: '10px' }} onClick={shareHandler}>Share</button>
        </div>
    );
};

export default ShareBtn;
