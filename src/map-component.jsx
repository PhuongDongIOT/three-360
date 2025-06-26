function MapComponent() {
    return (
        <div className='w-full rounded-xl overflow-hidden'>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15676.62165382228!2d106.7116703!3d10.79940645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1750914043166!5m2!1sen!2s" // Replace with your actual embed code
                className='w-4xl h-112'
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
        </div>
    );
}

export default MapComponent;