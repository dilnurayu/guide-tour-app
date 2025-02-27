import React from "react";
import "./style/Notification.css";
import guidePerson from "../assets/profile.png";

const NotificationView = ({
  userType,
  guideBookings,
  tourBookings,
  loading,
  error,
  onConfirm,
}) => {
  if (loading) {
    return <div></div>;
  }

  if (error) {
    return <div className="notification-error">Error: {error}</div>;
  }

  if (userType === "guide") {
    return (
      <div className="notification">
        <h1>Notifications</h1>
        <div className="notification-list">
          <h2>Bookings for Me</h2>
          {guideBookings.length === 0 ? (
            <p>No guide bookings available.</p>
          ) : (
            guideBookings.map((booking) => (
              <div className="notification-container" key={booking.book_id}>
                <div className="notification-wrapper">
                  <img src={guidePerson} alt="ProfilePic" />
                  <div className="notification-details">
                    <h3>{booking.guide_name || "Tourists Name"}</h3>
                    <p className="notification-message">
                      Language: {booking.language_id} | Reserve Count:{" "}
                      {booking.reserve_count} | Date: {booking.tour_date}
                    </p>
                    <p className="notification-message">{booking.message}</p>
                  </div>
                </div>
                {booking.confirmed ? (
                  <button disabled>Confirmed</button>
                ) : (
                  <button onClick={() => onConfirm(booking.book_id, "guide")}>
                    Confirm
                  </button>
                )}
              </div>
            ))
          )}
        </div>

        <div className="notification-list">
          <h2>Bookings for My Tours</h2>
          {tourBookings.length === 0 ? (
            <p>No tour bookings available.</p>
          ) : (
            tourBookings.map((booking) => (
              <div className="notification-container" key={booking.book_id}>
                <div className="notification-wrapper">
                  <img src={guidePerson} alt="ProfilePic" />
                  <div className="notification-details">
                    <h3>{booking.tour_title || "Tour Name"}</h3>
                    <p className="notification-message">
                      Language: {booking.language_id} | Reserve Count:{" "}
                      {booking.reserve_count}
                    </p>
                    <p className="notification-message">{booking.message}</p>
                  </div>
                </div>
                {booking.confirmed ? (
                  <button disabled>Confirmed</button>
                ) : (
                  <button onClick={() => onConfirm(booking.book_id, "tour")}>
                    Confirm
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    );
  } else if (userType === "tourist") {
    return (
      <div className="notification">
        <h1>Notifications</h1>
        <div className="notification-list">
          <h2>My Bookings for Guide</h2>
          {guideBookings.length === 0 ? (
            <p>No guide bookings available.</p>
          ) : (
            guideBookings.map((booking) => (
              <div className="notification-container" key={booking.book_id}>
                <div className="notification-wrapper">
                  <img src={guidePerson} alt="ProfilePic" />
                  <div className="notification-details">
                    <h3>{booking.guide_name || "Guide's Name"}</h3>
                    <p className="notification-message">
                      Language: {booking.language_id} | Reserve Count:{" "}
                      {booking.reserve_count} | Date: {booking.tour_date}
                    </p>
                    <p className="notification-message">{booking.message}</p>
                  </div>
                </div>
                <p
                  className={
                    booking.confirmed
                      ? "notification-confirmed"
                      : "notification-waiting"
                  }
                >
                  {booking.confirmed ? "Confirmed" : "Waiting"}
                </p>
              </div>
            ))
          )}
        </div>

        <div className="notification-list">
          <h2>My Bookings for Tours</h2>
          {tourBookings.length === 0 ? (
            <p>No tour bookings available.</p>
          ) : (
            tourBookings.map((booking) => (
              <div className="notification-container" key={booking.book_id}>
                <div className="notification-wrapper">
                  <img src={guidePerson} alt="ProfilePic" />
                  <div className="notification-details">
                    <h3>{booking.tour_title || "Tour Title"}</h3>
                    <p className="notification-message">
                      Language: {booking.language_id} | Reserve Count:{" "}
                      {booking.reserve_count}
                    </p>
                    <p className="notification-message">{booking.message}</p>
                  </div>
                </div>
                <p
                  className={
                    booking.confirmed
                      ? "notification-confirmed"
                      : "notification-waiting"
                  }
                >
                  {booking.confirmed ? "Confirmed" : "Waiting"}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

  return null;
};

export default NotificationView;
