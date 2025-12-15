import ReactDom from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import LogIn from "./pages/shared/LogIn.jsx";
import ProtectedRoutes from "./shared/ProtectedRoutes.jsx";
import Body from "./components/Body.jsx";
import RegisterEmployee from "./pages/admin/RegisterEmployee.jsx";
import Employees from "./pages/admin/Employees.jsx";
import EmployeeCard from "./pages/admin/EmployeeCard.jsx";
import EmployeeAbout from "./pages/employee/EmployeeAbout.jsx";
import RegisterTimeLog from "./pages/employee/RegisterTimeLog.jsx";
import TimeLogs from "./pages/employee/TimeLogs.jsx";
import AdminAbout from "./pages/admin/AdminAbout.jsx";

ReactDom.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/home" element={<Body />} />
        <Route path="/login" element={<LogIn />} />
        <Route element={<ProtectedRoutes />}>
          {/***  Admin routes ***/}
          <Route path="/about" element={<AdminAbout />} />
          <Route path="/registeremployee" element={<RegisterEmployee />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/employee/:id" element={<EmployeeCard />} />
          {/***  Employee routes ***/}
          <Route path="/about" element={<EmployeeAbout />} />
          <Route path="/registertimelog" element={<RegisterTimeLog />} />
          <Route path="/timelogs" element={<TimeLogs />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);
