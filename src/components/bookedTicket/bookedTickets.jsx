import React from "react";
import { Box, Typography, Card, CardContent, Grid, Fab, CardHeader, CardActions, Button, Paper, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectBooking } from "../../redux/Booking/selectors";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import { useEffect } from "react";
import LoadingOverlay from '../../sharedComponent/Loading/loading';
import { fetchTicketDetails, cancelTicket } from "../../redux/BookedTickets/actions";  //Booked tickets
import { BookedTickets, BookedSeatsLoading } from "../../redux/BookedTickets/selectors";
import LightbulbIcon from "@mui/icons-material/Lightbulb";

function BookedTicketsPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ticketList = useSelector(BookedTickets);
  const teamSuggestion = ticketList?.teamProximitySugguestionDto;
  const loading = useSelector(BookedSeatsLoading);
  const { employeeId } = useSelector((state) => state.auth);
  console.log("ticketList", ticketList);
  const booking = useSelector(selectBooking);

  // Fetch API data on mount
  useEffect(() => {

    console.log("Employee ID in QRScanner:", employeeId);
    const fetchData = async () => {
      try {
        console.log("fetchTicketDetails func fired");
        dispatch(fetchTicketDetails(employeeId));
      }
      catch {
        console.log("error");
      }
    }


    fetchData();
  }, [dispatch]);

  const handleAddClick = () => {
    navigate("/book-seat");
  };
  const handleQRScan = () => {
    navigate("/scan-qr");
  }
  const handleAttendance = async () => {
  try {
    const response = await fetch(
      `https://seatn-sync-production.up.railway.app/infy/attendance?empId=${employeeId}&location=chennai&status=IN`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to mark attendance");
    }

    const data = await response.json();
    console.log("Attendance success:", data);

    alert("Attendance marked successfully!");
  } catch (error) {
    console.error("Attendance error:", error);
    alert("Something went wrong while marking attendance!");
  }
};
  return (
    <Box sx={{ p: 2, position: "relative", minHeight: "100vh", bgcolor: "#f5f5f5" }}>
      <Typography variant="h5" gutterBottom sx={{ fontSize: '18px', fontWeight: 'bold', mb: 3 }}>
        🎟️ Your Booked Tickets
      </Typography>
      <LoadingOverlay loading={loading} />

      {ticketList?.empSeats?.length ? (
        ticketList?.empSeats?.map((data, idx) => (
          <Paper
            key={idx}
            elevation={3}
            sx={{
              mb: 3,
              maxWidth: 600,
              mx: 'auto',
              borderRadius: 3,
              overflow: 'hidden',
              background: 'linear-gradient(135deg, #f0f4ff, #ffffff)'
            }}
          >
            {/* Date Badge */}
            <Box sx={{ backgroundColor: 'primary.main', color: 'white', p: 1.5 }}>

              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                📅 {data.bookingDate}
              </Typography>
            </Box>

            {/* Ticket Content */}
            <CardContent>
              <Stack spacing={1}>
                <Typography variant="body2" fontWeight="bold">
                  ⏰ Start: {data.startTime || "09:00"} | End: {data.endTime || "18:00"}
                </Typography>
                <Typography variant="body2" fontWeight="bold">
                  📍 {data.city}, {data.dcName}, {data.blockName}, {data.wingName}
                </Typography>
                <Typography variant="body2" fontWeight="bold">
                  💺 Seat No: {data.seatName}
                </Typography>
                <Typography variant="body2" fontWeight="bold">
                  Status: {data.currentStatus}
                </Typography>
              </Stack>
            </CardContent>

            {/* Actions */}{data.currentStatus === "BOOKED" &&
              <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
                <Button size="small" color="error" variant="outlined"
                  onClick={() => {
                    dispatch(cancelTicket(data.bookingId, data.waitListId))
                      .then(() => dispatch(fetchTicketDetails(employeeId)));
                  }}
                >
                  Cancel
                </Button>
              </CardActions>
            }

          </Paper>
        ))
      ) : (
        <Typography variant="body1" sx={{ mt: 2 }}>
          No tickets booked yet.
        </Typography>
      )}


      {teamSuggestion && (
  <Paper
    elevation={3}
    sx={{
      p: 2,
      my: 2,
      mx: 'auto',
      maxWidth: 600,
      borderRadius: 3,
      bgcolor: "#fff9c4", // Light yellow
      display: "flex",
      alignItems: "flex-start",
      gap: 2
    }}
  >
    <LightbulbIcon sx={{ color: "#fbc02d", fontSize: 40 }} />

    <Box>
      <Typography variant="subtitle1" fontWeight="bold">
        Suggested Seating Area
      </Typography>

      <Typography variant="body2">
        📍 {teamSuggestion.dcName}, {teamSuggestion.blockName}
      </Typography>

      <Typography variant="body2">
        🏢 {teamSuggestion.wingName}
      </Typography>
    </Box>
  </Paper>
)}



      {/* Floating + icon */}
      <Fab
        color="primary"
        aria-label="add"
        onClick={handleAddClick}
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        <AddIcon />
      </Fab>
      <Fab
        onClick={handleQRScan}
        sx={{ position: "fixed", bottom: 16, right: 80 }}>
        <QrCodeScannerIcon />
      </Fab>
      {/* New Attendance FAB */}
<Fab
  onClick={handleAttendance}
  color="secondary"
  sx={{ position: "fixed", bottom: 16, right: 150 }}
>
  <Typography sx={{ fontWeight: 'bold' }}>IN</Typography>
</Fab>
    </Box>
  );
}

export default BookedTicketsPage;
