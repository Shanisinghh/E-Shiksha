import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import store from "./redux/store.js";
import { Provider, useSelector } from "react-redux";

export const serverURL ="https://e-shiksha-fain.onrender.com"

// export const serverURL = 
//     window.location.hostname === "localhost"
//       ? "http://localhost:5000"
//       :"https://e-shiksha-fain.onrender.com";

//  Lazy-loaded Pages
const Home = lazy(() => import("./pages/Home.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const SignUp = lazy(() => import("./pages/SignUp.jsx"));
const Profile = lazy(() => import("./pages/Profile.jsx"));
const Mycourses = lazy(() => import("./pages/MyCourses.jsx"));
const Dashboard = lazy(() => import("./educator/Dashboard.jsx"));
const ForgetPassword = lazy(() => import("./pages/ForgetPassword.jsx"));
const EditProfile = lazy(() => import("./pages/EditProfile.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));
const UnderProcess = lazy(() => import("./pages/UnderProcess.jsx"));
const Courses = lazy(() => import("./educator/Courses.jsx"));
const CreateCourse = lazy(() => import("./educator/CreateCourse.jsx"));
const UpdateCourse = lazy(() => import("./educator/UpdateCourse.jsx"));
const AllCourses = lazy(() => import("./pages/AllCourses.jsx"));
const CreateLecture = lazy(() => import("./pages/CreateLecture.jsx"));
const UpdateLecture = lazy(() => import("./pages/UpdateLecture.jsx"));
const Loader = lazy(() => import("./components/Loader.jsx"));
const ViewCourse = lazy(() => import("./pages/ViewCourse.jsx"));
const ViewLecture = lazy(() => import("./pages/ViewLecture.jsx"));
const AboutUs = lazy(() => import("./pages/AboutUs.jsx"));
const ContactUs = lazy(() => import("./pages/ContactUs.jsx"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy.jsx"));
const TermsAndConditions = lazy(() => import("./pages/TermsAndConditions.jsx"));
const FAQ = lazy(() => import("./pages/FAQ.jsx"));
const RefundPolicy = lazy(() => import("./pages/RefundPolicy.jsx"));
const SearchWithAI = lazy(()=>import("./pages/SearchWithAI.jsx"))

// ProtectedRoute wrapper
function ProtectedRoute({ children }) {
  const userData = useSelector((state) => state.user?.user);
  return userData ? children : <Login />;
}

function EducatorRoute({ children }) {
  const userData = useSelector((state) => state.user?.user);
  return userData?.role === "Educator" ? children : <SignUp />;
}

// Error fallback
function ErrorFallback({ error }) {
  return (
    <div className="p-6 text-red-600">
      <h2>Something went wrong!</h2>
      <pre>{error.message}</pre>
    </div>
  );
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="forgetpassword" element={<ForgetPassword />} />
      <Route path="underprocess" element={<UnderProcess />} />
      <Route path="allcourses" element={<AllCourses />} />
      <Route path="viewcourse/:courseId" element={<ViewCourse />} />
      <Route path="aboutus" element={<AboutUs />} />
      <Route path="contactus" element={<ContactUs />} />
      <Route path="privacypolicy" element={<PrivacyPolicy />} />
      <Route path="termsandconditions" element={<TermsAndConditions />} />
      <Route path="faq" element={<FAQ />} />
      <Route path="refundpolicy" element={<RefundPolicy />} />
      <Route path="search" element={<SearchWithAI />} />
      <Route path="*" element={<NotFound />} />

      {/* Educator Routes */}
      <Route
        path="dashboard"
        element={
          <EducatorRoute>
            <Dashboard />
          </EducatorRoute>
        }
      />
      <Route
        path="courses"
        element={
          <EducatorRoute>
            <Courses />
          </EducatorRoute>
        }
      />
      <Route
        path="createcourse"
        element={
          <EducatorRoute>
            <CreateCourse />
          </EducatorRoute>
        }
      />
      <Route
        path="updatecourse/:courseId"
        element={
          <EducatorRoute>
            <UpdateCourse />
          </EducatorRoute>
        }
      />
      <Route
        path="createlecture/:courseId"
        element={
          <EducatorRoute>
            <CreateLecture />
          </EducatorRoute>
        }
      />
      <Route
        path="updatelecture/:lectureId"
        element={
          <EducatorRoute>
            <UpdateLecture />
          </EducatorRoute>
        }
      />

      {/* Protected Routes */}
      <Route
        path="profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="mycourses"
        element={
          <ProtectedRoute>
            <Mycourses />
          </ProtectedRoute>
        }
      />
      <Route
        path="editprofile"
        element={
          <ProtectedRoute>
            <EditProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="viewlecture/:courseId"
        element={
          <ProtectedRoute>
            <ViewLecture />
          </ProtectedRoute>
        }
      />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Provider store={store}>
        <Suspense fallback={<Loader />}>
          <RouterProvider router={router} />
        </Suspense>
      </Provider>
    </ErrorBoundary>
  </StrictMode>
);
