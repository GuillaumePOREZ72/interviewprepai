/**
 * UserContext Unit Tests
 *
 * Tests the UserProvider and UserContext functionality:
 * - Initial state (no user, loading)
 * - updateUser() stores user and tokens
 * - clearUser() removes user and tokens
 * - Auto-fetch user profile on mount with existing token
 */
import { render, screen, waitFor, act } from "@testing-library/react";
import UserProvider, { UserContext } from "../../../context/useContext";
import { useContext } from "react";
import { createMockUser, createMockAuthResponse } from "../../helpers/testUtils";

// Mock axiosInstance
jest.mock("../../../utils/axiosInstance", () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    post: jest.fn(),
    interceptors: {
      request: { use: jest.fn() },
      response: { use: jest.fn() },
    },
  },
}));

import axiosInstance from "../../../utils/axiosInstance";
const mockedAxios = axiosInstance as jest.Mocked<typeof axiosInstance>;

// Test component to access context
const TestConsumer = () => {
  const context = useContext(UserContext);

  if (!context) {
    return <div>No context</div>;
  }

  return (
    <div>
      <div data-testid="loading">{context.loading.toString()}</div>
      <div data-testid="user">{context.user ? context.user.name : "null"}</div>
      <button onClick={() => context.updateUser(createMockAuthResponse())}>
        Update User
      </button>
      <button onClick={() => context.clearUser()}>Clear User</button>
    </div>
  );
};

describe("UserContext", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  describe("Initial state", () => {
    it("should start with loading=true and user=null when no token exists", async () => {
      render(
        <UserProvider>
          <TestConsumer />
        </UserProvider>
      );

      // Initially loading, then should become false when no token found
      await waitFor(() => {
        expect(screen.getByTestId("loading").textContent).toBe("false");
      });

      expect(screen.getByTestId("user").textContent).toBe("null");
    });

    it("should fetch user profile when token exists in localStorage", async () => {
      // Setup: token exists
      localStorage.setItem("token", "existing-token");

      const mockUser = createMockUser({ name: "Fetched User" });
      mockedAxios.get.mockResolvedValueOnce({ data: mockUser });

      render(
        <UserProvider>
          <TestConsumer />
        </UserProvider>
      );

      // Wait for user to be fetched
      await waitFor(() => {
        expect(screen.getByTestId("user").textContent).toBe("Fetched User");
      });

      expect(mockedAxios.get).toHaveBeenCalledWith("/api/auth/profile");
    });

    it("should clear tokens if profile fetch fails", async () => {
      localStorage.setItem("token", "invalid-token");
      localStorage.setItem("refreshToken", "invalid-refresh");

      mockedAxios.get.mockRejectedValueOnce(new Error("Unauthorized"));

      render(
        <UserProvider>
          <TestConsumer />
        </UserProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId("loading").textContent).toBe("false");
      });

      expect(localStorage.getItem("token")).toBeNull();
      expect(localStorage.getItem("refreshToken")).toBeNull();
    });
  });

  describe("updateUser", () => {
    it("should update user and store tokens in localStorage", async () => {
      render(
        <UserProvider>
          <TestConsumer />
        </UserProvider>
      );

      // Wait for initial load
      await waitFor(() => {
        expect(screen.getByTestId("loading").textContent).toBe("false");
      });

      // Click update user button
      await act(async () => {
        screen.getByText("Update User").click();
      });

      // Check user is updated
      expect(screen.getByTestId("user").textContent).toBe("Test User");

      // Check tokens are stored
      expect(localStorage.getItem("token")).toBe("mock-access-token-12345");
      expect(localStorage.getItem("refreshToken")).toBe("mock-refresh-token-67890");
    });
  });

  describe("clearUser", () => {
    it("should clear user and remove tokens from localStorage", async () => {
      // Setup: user is logged in
      localStorage.setItem("token", "existing-token");
      localStorage.setItem("refreshToken", "existing-refresh");

      const mockUser = createMockUser();
      mockedAxios.get.mockResolvedValueOnce({ data: mockUser });

      render(
        <UserProvider>
          <TestConsumer />
        </UserProvider>
      );

      // Wait for user to be fetched
      await waitFor(() => {
        expect(screen.getByTestId("user").textContent).toBe("Test User");
      });

      // Click clear user button
      await act(async () => {
        screen.getByText("Clear User").click();
      });

      // Check user is cleared
      expect(screen.getByTestId("user").textContent).toBe("null");

      // Check tokens are removed
      expect(localStorage.getItem("token")).toBeNull();
      expect(localStorage.getItem("refreshToken")).toBeNull();
    });
  });
});

