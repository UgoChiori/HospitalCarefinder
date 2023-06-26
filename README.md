# Hospital Carefinder

Hospital Carefinder is a web application built using Vite, React, and Typescript. It provides a user-friendly interface for users to search and find hospitals near their location. The application integrates with the Google Places API to retrieve detailed information about hospitals, and it leverages Firebase for authentication and storage functionalities.

## Key Features

- *Hospital Data*: The application fetches hospital information using the Google Places API. Users can view details such as hospital name, address, ratings, and more.
- *Firebase Authentication*: Hospital Carefinder incorporates Firebase Authentication to handle user authentication and authorization. Users can create accounts, log in, and securely access the application.
- *Firebase Storage*: Firebase Storage is used to store user data, allowing for seamless sharing and exporting capabilities. User-specific data can be saved and retrieved as needed.
- *User Location*: The application utilizes the user's location to display nearby hospitals. Users can easily find hospitals in their vicinity without having to manually search for a location.
- *Google Maps Integration*: Hospital locations are displayed on an interactive map using the Google Maps API. Users can visualize hospitals in their area and obtain directions if needed.

## Technologies Used

- *Vite*: Vite is a fast build tool specifically designed for modern web applications. It is used to set up the project and provide a development server.
- *React*: React is a popular JavaScript library for building user interfaces. It is utilized to create interactive and dynamic UI components in Hospital Carefinder.
- *Typescript*: Typescript is a typed superset of JavaScript that adds static typing to the language. It enhances the project's robustness by catching potential errors during development.
- *Google Maps API*: The Google Maps API allows for the integration of Google Maps into web applications. In Hospital Carefinder, it enables the display of hospital locations on an interactive map.
- *Google Places API*: The Google Places API provides detailed information about places, including hospitals. Hospital Carefinder utilizes this API to fetch hospital data based on user searches.
- *Firebase*: Firebase is a suite of cloud-based tools provided by Google. In this project, Firebase Authentication is used for user authentication, while Firebase Storage is utilized for data storage.

## Installation

To install and run Hospital Carefinder locally, follow these steps:

1. Clone the repository:

   ```shell
   git clone https://github.com/your-username/hospital-carefinder.git
   

2. Install the dependencies:

   ```shell
   cd hospital-carefinder
   npm install
   

3. Configure Firebase:

   - Create a new Firebase project at [https://firebase.google.com/](https://firebase.google.com/).
   - Enable Firebase Authentication and Firebase Storage in your project settings.
   - Obtain the necessary Firebase project credentials (API key, project ID, etc.).
   - Update the Firebase configuration in the source code of the Hospital Carefinder application.

4. Start the development server:

   ```shell
   npm run dev
   

5. Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to access the Hospital Carefinder application.

## Usage

To use Hospital Carefinder, follow these steps:

1. Launch the application in your browser.
2. If you don't have an account, you can create one by selecting the appropriate option and providing the required information.
3. Once logged in, you will be prompted to allow the application to access your location. Grant the permission to proceed.
4. The application will display a map with hospital markers in your vicinity.
5. You can interact with the map to explore hospitals and click on markers to view detailed information about each hospital.
6. To search for hospitals in a different location, enter a city, address, or postal code in the search bar provided.
7. The map will update to show hospitals in the specified location.
8. You can use the various controls and options on the map to zoom in, zoom out, and navigate to different areas.
9. Hospital markers on the map can be clicked to view additional details such as the hospital's name, address, ratings, and other relevant information.
10. Use the export feature to save hospital data or share it with others. This feature utilizes Firebase Storage to store the exported data securely.
11. If you wish to log out, you can do so by selecting the appropriate option in the application's user interface.

## Contributing

Contributions to Hospital Carefinder are highly appreciated. If you encounter any issues, have suggestions for improvements, or would like to contribute to the project, please follow these steps:

1. Fork the repository on GitHub.
2. Create a new branch for your feature or bug fix.
3. Make the necessary changes in your branch.
4. Commit and push your changes to your forked repository.
5. Submit a pull request to the main repository, detailing the changes you have made.

## License

This project is licensed under the MIT License. You can find the full license information in the [LICENSE](LICENSE) file.
