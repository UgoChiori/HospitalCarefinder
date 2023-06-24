
# Hospital Carefinder

Hospital Carefinder is a web application built using Vite, React, and Typescript. It provides a user-friendly interface for finding hospitals near the user's location using the Google Places API. The project also integrates Firebase authentication and storage for user authentication and data sharing.

## Features

- **Hospital Data**: Retrieve hospital information based on the user's location using the Google Places API.
- **Firebase Authentication**: Secure user authentication and registration using Firebase Authentication.
- **Firebase Storage**: Store and retrieve user data using Firebase Storage for seamless sharing and exporting capabilities.
- **User Location**: Utilize the user's location to display hospitals in their vicinity.
- **Google Maps Integration**: Display hospitals on an interactive map using the Google Maps API.

## Technologies Used

- **Vite**: A fast build tool for modern web applications, used for project setup and development server.
- **React**: A JavaScript library for building user interfaces, used for creating interactive UI components.
- **Typescript**: A typed superset of JavaScript, used for adding type safety to the project.
- **Google Maps API**: An API for embedding Google Maps into web applications, used for displaying hospital locations on a map.
- **Google Places API**: An API for retrieving detailed information about places, used for fetching hospital data.
- **Firebase**: A comprehensive suite of cloud-based tools provided by Google, used for authentication and storage.

## Installation

1. Clone the repository:

   bash
   git clone https://github.com/your-username/hospital-carefinder.git
   

2. Install the dependencies:

   bash
   cd hospital-carefinder
   npm install
   

3. Configure Firebase:

   - Create a new Firebase project at [https://firebase.google.com/](https://firebase.google.com/).
   - Enable Firebase Authentication and Firebase Storage in your project settings.
   - Obtain your Firebase project credentials (API key, project ID, etc.) and update the Firebase configuration in the project's source code.

4. Start the development server:

   bash
   npm run dev
   

5. Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to access the Hospital Carefinder application.

## Usage

- Upon launching the application, you will be prompted to log in or create a new account.
- Once logged in, the application will request permission to access your location. Grant the permission to proceed.
- The application will display hospitals near your location on the map and provide additional information about each hospital.
- You can search for hospitals in other locations by entering a city, address, or postal code.
- Use the export feature to save hospital data or share it with others.

## Contributing

Contributions to Hospital Carefinder are welcome! If you encounter any issues or have suggestions for improvements, please open an issue on the project's GitHub repository.

## License

This project is licensed under the [MIT License](LICENSE).



Feel free to modify the content and structure according to your project's specific details.
