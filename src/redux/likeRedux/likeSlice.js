import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  likeLists: [],
};
export const fetchLikes = createAsyncThunk("like/fetchLikes", async () => {
  try {
    const limit = 14;
    const offset = 0;
    const accessToken = localStorage.getItem("access_token");
    const res = await fetch(
      `https://api.spotify.com/v1/playlists/37i9dQZF1DWWY64wDtewQt/tracks?limit=${limit}&offset=${offset}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (!res.ok) {
      throw new Error("There was an error fetching in the HomePlay pages!!!");
    }
    const data = await res.json();
    return data.items;
  } catch (error) {
    console.error("Error fetching", error);
  }
});
const likeSlice = createSlice({
  name: "like",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchLikes.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchLikes.fulfilled, (state, action) => {
      state.loading = false;
      state.likeLists = action.payload;
      state.error = null;
    });
    builder.addCase(fetchLikes.rejected, (state, action) => {
      state.loading = false;
      state.likeLists = [];
      state.error = action.error.message;
    });
  },
});

export const likeReducer = likeSlice.reducer;
