# Real-Time Image Gallery & Interaction App

## Introduction

This is a **multi-user real-time web application** built for the FotoOwl Internship assignment. The main goal of this app is to let multiple users view photos, add reactions (emojis), and post comments at the same time.

If I open this app on my phone and you open it on your laptop, and I "heart" a photo, you will see it **instantly** without refreshing the page!

**Live Demo Link:** [Insert Your Vercel/Netlify Link Here]

---

## Features

- **Photo Gallery:** Fetches high-quality images from Unsplash API with Infinite Scroll (Load More).
- **Real-Time Interactions:**
  - **Reactions:** Hover over the like button to pick an emoji.
  - **Live Comments:** Chat on any photo and see messages appear instantly.
- **Live Activity Feed:** A sidebar that updates whenever anyone interacts with any photo globally.
- **User Identity:** Automatically gives you a random "cool name" and color so you don't need to login/signup.
- **Responsive Design:** Works on Laptop and Mobile.

---

## Tech Stack

I used the modern React:

- **Frontend:** React.js - Functional Components.
- **Styling:** Tailwind CSS - For fast and clean UI.
- **Real-Time Database:** **InstantDB** - To sync data instantly between users.
- **State Management:** **Zustand** - To manage the User Identity and Global Modal state.
- **API Handling:** **React Query** - To fetch and cache Unsplash images efficiently.
- **Icons:** Lucide React.

---

## Setup Instructions

Follow these steps to run the project on your computer:

1.  **Clone the Repository:**

    ```bash
    git clone [Your-GitHub-Repo-Link]
    cd [Your-Folder-Name]
    ```

2.  **Install Dependencies:**

    ```bash
    npm install
    ```

3.  **Setup Environment Variables:**
    Create a file named `.env` in the main folder. Add your API keys here:

    ```env
    VITE_UNSPLASH_ACCESS_KEY=your_unsplash_api_key_here
    VITE_INSTANTDB_APP_ID=your_instantdb_app_id_here
    ```

4.  **Run the App:**
    ```bash
    npm run dev
    ```
    Open the link shown in the terminal (usually `http://localhost:5173`).

---

## API Handling Strategy

For fetching images, I used the **Unsplash API**.

- **Why React Query?** Instead of `useEffect`, I used `useInfiniteQuery` from React Query. This handles "Loading" states, "Error" states, and caching automatically. It makes the "Load More" button work very smoothly without fetching the same data twice.
- **Axios:** I created a central `api/unsplash.js` file using `axios.create`. This keeps the code clean because I don't have to type the base URL and API Key headers again and again.

---

## InstantDB Schema & Usage

InstantDB is a "Graph-like" database, so I didn't need a complex backend. I structured my data like this:

**1. Reactions (Likes)**
When you react to an image, it saves:

- `imageId`: Which photo is it?
- `userId` & `userName`: Who liked it?
- `emoji`: Which emoji?
- `imageThumbnail`: Small photo url (to show in the Feed).

**2. Interactions (Comments)**
When you comment, it saves:

- `text`: The comment message.
- `imageId`: Which photo?
- `createdAt`: Timestamp (to sort messages).

**Real-Time:**
I used `db.useQuery` in React. It automatically "listens" to changes. If User A adds a comment to the DB, InstantDB pushes that data to User B's screen immediately.

---

## Key React Decisions

- **Component Separation:** I split the code into `Gallery`, `Feed`, and `Interaction` folders. This makes it easy to read. For example, the `ImageCard` handles the display, but the `LikeButton` handles the logic.
- **Zustand for User:** Since the User Identity (Name/Color) is needed everywhere (Header, Comments, Likes), I put it in a Zustand store. It is much simpler than React Context API.
- **Optimistic Updates:** The app feels fast because when you click "Like", the UI updates immediately, while the database saves in the background.

---

## Challenges Faced & Solutions

1.  **Challenge:** The "Hover" Emoji Picker was tricky. When I moved the mouse from the button to the emoji list, the list would disappear.

    - **Solution:** I added "Invisible Padding" between the button and the list. This created a bridge so the mouse doesn't "fall into the gap."

2.  **Challenge:** Making the Modal work nicely with the Feed.

    - **Solution:** I created a helper component `SingleImageViewer`. When you click an item in the Feed, it fetches that specific image data and opens the Modal.

3.  **Challenge:** Mobile View. The Feed and Gallery couldn't fit on one screen.
    - **Solution:** I added a "Bottom Navigation Bar" only for mobile. You can toggle between "Gallery" and "Activity Feed" easily.
4.  **Challenge:** The "Auto-Scroll" Challenge.
    - **Solution:** I used a useRef hook attached to the end of the list. Inside a useEffect, I told the app to automatically scroll to the bottom whenever the comments array changes.
5.  **Challenge:** I was new to **Zustand**, **React Query**, and **InstantDB**. I had only worked with standard `useState` and `useEffect` before this assignment.
    - **Solution:** Instead of implementing them directly, I first read their official documentation and built small "prototype" examples to understand the concepts. Once I felt confident, I integrated them into the main project.

---

## 🔮 What I would improve with more time

If I had **1 more week**, I would implement these advanced features:

1. **Custom Backend (MERN Stack):** Currently, I used InstantDB for speed. Since I have basic knowladge with **Node.js, Express, and MongoDB**, I would build a custom REST API to handle users, comments, and reactions. This would give me full control over data validation and security.

2. **Advanced Filtering & Categories:** Just like the real Unsplash, I would add category tabs (e.g., _Nature, Technology, Architecture_) so users can filter images easily instead of just seeing a random feed.

3. **Authentication System:** Right now, users are random. I would implement **JWT-based Authentication** or Google OAuth so users can log in, save their profile, and keep a history of their liked photos.

4. **Virtualization:** If the gallery grows to 1000+ photos, DOM nodes will increase. I would implement `react-window` to only render the photos currently visible on the screen for better performance.

5. **Search Functionality:** I would add a search bar at the top to let users query specific topics (e.g., "Cats", "Office setup") using the Unsplash Search API.

---

**Thank you for reviewing my assignment**
I had a lot of fun building this Real-Time application and i learnt lot of new things.
