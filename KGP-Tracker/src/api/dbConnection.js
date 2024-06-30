import { dbAxios } from "./axiosConfig";

export const getUser = async (email, password) => {
  try {
    const response = await dbAxios.get("/users", {
      params: { email, password },
    });
    const user = response.data.find(
      (user) => user.email === email && user.password === password,
    );
    if (user) {
      return user;
    } else {
      console.log("Nieprawidłowy e-mail lub hasło");
      return null;
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("Logowanie nie powiodło się. Spróbuj ponownie później.");
    return null;
  }
};

export const registerUser = async (name, email, password) => {
  try {
    // Sprawdzenie, czy użytkownik z podanym adresem e-mail już istnieje
    const existingUserResponse = await dbAxios.get("/users", {
      params: { email },
    });

    if (existingUserResponse.data.length > 0) {
      alert("Użytkownik z tym adresem e-mail już istnieje.");
      return;
    }

    // Rejestracja nowego użytkownika
    const response = await dbAxios.post("/users", {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error("Registration error: " + error.message);
  }
};

// pobranie wszystkich szczytów
export const getPeaks = async () => {
  try {
    const response = await dbAxios.get("/peaks");
    return response.data;
  } catch (error) {
    throw new Error(`Błąd podczas ładowania szczytów: ${error.message}`);
  }
};

// pobranie pojedynczego szczytu
export const getSinglePeak = async (id) => {
  try {
    const response = await dbAxios.get(`/peaks/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Błąd podczas ładowania szczytu: ${error.message}`);
  }
};

// pobieranie szczytów danego użytkownika
export const getUserPeaks = async (userId) => {
  try {
    const response = await dbAxios.get(`/userPeaks`, {
      params: { userId },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      `Błąd podczas ładowania szczytów użytkownika: ${error.message}`,
    );
  }
};

// urposzczone zatwierdzanie zdobycia szczytu
export const confirmUserPeak = async (userId, peakId, date) => {
  try {
    const newUserPeak = {
      userId,
      peakId,
      date,
    };
    await dbAxios.post(`/userPeaks`, newUserPeak);
    return newUserPeak;
  } catch (error) {
    throw new Error(
      `Błąd podczas zatwierdzania zdobycia szczytu: ${error.message}`,
    );
  }
};
