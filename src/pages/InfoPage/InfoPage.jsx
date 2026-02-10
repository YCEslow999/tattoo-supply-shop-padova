import './InfoPage.css'
import React from 'react'

export const InfoPage = () => {
  const openingHours = [
    { day: 'Lunedì', hours: '09:00 - 18:00' },
    { day: 'Martedì', hours: '09:00 - 18:00' },
    { day: 'Mercoledì', hours: '09:00 - 18:00' },
    { day: 'Giovedì', hours: '09:00 - 18:00' },
    { day: 'Venerdì', hours: '09:00 - 19:00' },
    { day: 'Sabato', hours: '09:00 - 17:00' },
    { day: 'Domenica', hours: 'Chiuso' }
  ]

  return (
    <div className="info-page">
      
      

      {/* OPENING HOURS SECTION */}
      <section className="info-section dark">
        <h2>Orari di Apertura</h2>
        <div className="hours-grid">
          {openingHours.map((item, index) => (
            <div key={index} className="hours-item">
              <span className="day-name">{item.day}</span>
              <span className={`hours-time ${item.hours === 'Chiuso' ? 'closed' : ''}`}>
                {item.hours}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* LOCATION SECTION */}
      <section className="info-section">
        <h2>Dove Trovarci</h2>
        <div className="location-container">
          <div className="location-info">
            <h3>📍 Indirizzo</h3>
            <p>Via Roma, 123<br />35121 Padova (PD)<br />Italia</p>
          </div>
          <div className="location-info">
            <h3>📞 Contatti</h3>
            <p>
              Telefono: <a href="tel:+39049123456">+39 049 123456</a><br />
              Email: <a href="mailto:info@illsuppdupdova.it">info@illsupplierpadova.it</a>
            </p>
          </div>
          <div className="location-info">
            <h3>📱 Social</h3>
            <p>
              Instagram: <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer">@illsupplierpadova</a><br />
              Facebook: <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer">Ill Supplier Padova</a>
            </p>
          </div>
        </div>
      </section>

      {/* MAP SECTION - Placeholder */}
      <section className="info-section map-section">
        <h2>Mappa</h2>
        <div className="map-placeholder">
          <iframe
            title="Mappa ubicazione"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2894.639277462286!2d11.8704!3d45.4064!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477f5d3f3f3f3f3f%3A0x123456789!2sPadova!5e0!3m2!1sit!2sit!4v1234567890"
            width="100%"
            height="400"
            style={{ border: 0, borderRadius: '12px' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="info-cta">
        <h2>Visita il Nostro Negozio</h2>
        <p>Scopri la nostra vasta collezione di prodotti professionali</p>
        <button onClick={() => window.location.href = '#contatti'}>Contattaci</button>
      </section>
    </div>
  )
}

export default InfoPage;