export const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const handleApiResponse = async (response) => {
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Something went wrong");
  }

  return result;
};

export const fetchGet = async (url) => {
  const response = await fetch(url, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  return handleApiResponse(response);
};

export const fetchDelete = async (url) => {
  const response = await fetch(url, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  return handleApiResponse(response);
};
