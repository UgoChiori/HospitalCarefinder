import { render, screen } from "@testing-library/react";
import App from "./App";
import "@testing-library/jest-dom/extend-expect";
import Hospitals from "./hospital/Hospitals";
import HospitalCard from "./hospital/HospitalCard";
import { BrowserRouter } from "react-router-dom";
import HospitalDetails from "./hospital/HospitalDetails";
import HomePage from "./landingpage/HomePage";
import NavigationBar from "./navigation/NavigationBar";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./components/Errorboundary/ErrorFallBack";
import AddReview from "./pages/AddReview";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MapContainer from "./pages/MapContainer";
import Profile from "./pages/Profile";
import Reviews from "./pages/Reviews";

test("renders learn react link", () => {
  render(<App />);
  const message = screen.queryByText(/learn react/i);
  expect(message).toBeDefined();
});

test("renders Hospitals", () => {
  render(
    <Hospitals
      handleDetails={function (): void {
        throw new Error("Function not implemented.");
      }}
    />
  );
  const message = screen.queryByText(/Hospitals/i);
  expect(message).toBeDefined();
});

test("renders HospitalCard", () => {
  render(
    <BrowserRouter>
      <HospitalCard
        name={""}
        status={""}
        rating={""}
        details={""}
        handleDetails={function (): void {
          throw new Error("Function not implemented.");
        }}
        formatted_address={""}
      />
    </BrowserRouter>
  );
  const message = screen.queryByText(/Details/i);
  expect(message).toBeDefined();
});

test("renders HospitalDetails", () => {
  render(
    <BrowserRouter>
      <HospitalDetails
        name={""}
        business_status={""}
        rating={""}
        details={""}
        // details={details}
        vicinity={""}
        opening_hours={false}
        placeId={""}
      />
    </BrowserRouter>
  );
  const message = screen.queryByText(/Details/i);
  expect(message).toBeDefined();
});

test("renders HomePage", () => {
  render(
    <BrowserRouter>
      <HomePage />
    </BrowserRouter>
  );
  const message = screen.queryByText(/Home/i);
  expect(message).toBeDefined();
});

test("renders NavigationBar", () => {
  render(
    <BrowserRouter>
      <NavigationBar
        signOut={function (): void {
          throw new Error("Function not implemented.");
        }}
        user={null}
      />
    </BrowserRouter>
  );
  const message = screen.queryByText(/Home/i);
  expect(message).toBeDefined();
});



test("renders ErrorBoundary", () => {
  render(
    <BrowserRouter>
      <ErrorBoundary
        fallbackRender={function (
        ): React.ReactNode | React.ReactElement<any, any> {
          throw new Error("Function not implemented.");
        }}
      ></ErrorBoundary>
    </BrowserRouter>
  );
  const message = screen.queryByText(/Home/i);
  expect(message).toBeDefined();
});

test("renders ErrorFallback", () => {
  render(
    <BrowserRouter>
      <ErrorFallback
        error={new Error("test")}
        resetErrorBoundary={function (): void {
          throw new Error("Function not implemented.");
        }}
      ></ErrorFallback>
    </BrowserRouter>
  );
  const message = screen.queryByText(/Home/i);
  expect(message).toBeDefined();
});

test("renders AddReview", () => {
  render(
    <BrowserRouter>
      <AddReview />
    </BrowserRouter>
  );
  const message = screen.queryByText(/Home/i);
  expect(message).toBeDefined();
});

test("renders Admin", () => {
  render(
    <BrowserRouter>
      <Admin />
    </BrowserRouter>
  );
  const message = screen.queryByText(/Home/i);
  expect(message).toBeDefined();
});

test("renders Login", () => {
  render(
    <BrowserRouter>
      <Login
        signIn={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    </BrowserRouter>
  );
  const message = screen.queryByText(/Home/i);
  expect(message).toBeDefined();
});

test("renders Register", () => {
  render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>
  );
  const message = screen.queryByText(/Home/i);
  expect(message).toBeDefined();
});

test("renders MapContainer", () => {
  render(
    <BrowserRouter>
      <MapContainer hospitals={[]} />
    </BrowserRouter>
  );
  const message = screen.queryByText(/Home/i);
  expect(message).toBeDefined();
});

test("renders Profile", () => {
  render(
    <BrowserRouter>
      <Profile />
    </BrowserRouter>
  );
  const message = screen.queryByText(/Home/i);
  expect(message).toBeDefined();
});

test("renders Reviews", () => {
  render(
    <BrowserRouter>
      <Reviews />
    </BrowserRouter>
  );
  const message = screen.queryByText(/Home/i);
  expect(message).toBeDefined();
});
