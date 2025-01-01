import { dbAxios } from "./axiosConfig";

export const getUser = async (email, password) => {
  try {
    const response = await dbAxios.get("/users", {
      params: { email, password },
    });
    if (response.data) {
      return response.data;
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
    // Rejestracja nowego użytkownika
    const response = await dbAxios.post("/users", {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error("Błąd rejestracji: " + error.message);
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
export const confirmUserPeak = async (formData) => {
  try {
    const response = await dbAxios.post('/userPeaks', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(`Błąd podczas zatwierdzania zdobycia szczytu: ${error.message}`);
  }
};


//usunięcie informacji o zdobyciu szczytu przez użytkownika
export const deleteUserPeak = async (userPeaksId) => {
  try {
    const response = await dbAxios.delete(`/userPeaks/${userPeaksId}`);
    return response.status;
  } catch (error) {
    throw new Error(
      `Błąd podczas usuwania informazji o zdobyciu szczytu: ${error.message}`,
    );
  }
}
