# Hospital Carefinder

Hospital Carefinder is a web application built using Vite, React, and TypeScript. It provides a user-friendly interface for users to search and find hospitals near their location. The application integrates with the Google Places API to retrieve detailed information about hospitals, and it leverages Firebase for authentication, storage, and real-time database functionalities.

## Features

- *Hospital Search*: Users can search for hospitals based on their location or a specific address. The application fetches hospital information using the Google Places API, including hospital name, address, ratings, and more.
- *User Authentication*: Hospital Carefinder incorporates Firebase Authentication to handle user registration, login, and authentication. Users can create accounts, log in, and securely access the application.
- *Hospital Reviews*: Registered users can make reviews on hospitals, which are immediately updated to the Firestore database. Reviews can include ratings, comments, and other relevant information.
- *Admin Portal*: An admin user has exclusive access to an admin portal where they can add new hospitals to the database. The admin's changes are reflected in real-time across the application.
- *Share Hospitals*: Users can easily share hospitals with others via email, WhatsApp, or by generating a shareable link. The application provides convenient sharing options for seamless communication.
- *Google Maps Integration*: Hospital locations are displayed on an interactive map using the Google Maps API. Users can visualize hospitals in their area, obtain directions, and explore nearby locations.
- *Responsive Design*: The application is fully responsive and adapts to different screen sizes, providing a consistent user experience across devices.

## Technologies Used

- *Vite*: Vite is a fast build tool specifically designed for modern web applications. It is used to set up the project, provide a development server, and optimize the application's build process.
- *React*: React is a popular JavaScript library for building user interfaces. It enables the creation of reusable UI components and facilitates efficient rendering and state management.
- *TypeScript*: TypeScript is a typed superset of JavaScript that enhances the development experience by providing static types and improved tooling support. It improves code quality, maintainability, and developer productivity.
- *Google Places API*: The Google Places API provides detailed information about places, including hospitals. Hospital Carefinder utilizes this API to fetch hospital data based on user searches and display it in the application.
- *Firebase*: Firebase is a comprehensive suite of cloud-based tools provided by Google. In this project, Firebase Authentication is used for user authentication, Firebase Firestore for real-time data storage, and Firebase Hosting to host the application.
- *React Router*: React Router is a popular routing library for React applications. It enables navigation and routing functionality in Hospital Carefinder, allowing users to move between different pages and components seamlessly.

## Installation and Setup

To run Hospital Carefinder locally, follow these steps:

1. Clone the repository:

   ```shell
   git clone https://github.com/your-username/hospital-carefinder.git
   

2. Navigate to the project directory:

   ```shell
   cd hospital-carefinder
   

3. Install the dependencies:

   ```shell
   npm install
   

4. Configure Firebase:

   - Create a new Firebase project at [https://firebase.google.com/](https://firebase.google.com/).
   - Enable Firebase Authentication, Firestore, and Storage in your project settings.
   - Obtain the necessary Firebase project credentials (API key, project ID, etc.).
   - Update the Firebase configuration in the source code of the Hospital Carefinder application.

5. Start the development server:

   ```shell
   npm run dev
   

6. Open your browser and navigate to [http://localhost:5173](http://localhost:5173) to access the Hospital Carefinder application.

## Usage

Once you have the Hospital Carefinder application up and running, you can perform the following actions:

- *Search for Hospitals*: Use the search bar to enter your location or a specific address and search for nearby hospitals. The application will display a list of hospitals and their corresponding details on the map.
- *View Hospital Details*: Click on a hospital marker on the map or select a hospital from the list to view detailed information about that hospital, including its name, address, ratings, and reviews.
- *Make Reviews*: If you are a registered user, you can make reviews on hospitals by providing ratings, comments, and other relevant information. Your reviews will be immediately updated in the Firestore database.
- *Admin Portal*: If you are an admin user, you can access the admin portal to add new hospitals to the database. The added hospitals will be reflected in real-time across the application for all users.
- *Share Hospitals*: Share hospitals with others by clicking on the share button. You can choose to share via email, WhatsApp, or generate a shareable link. The shared information will include hospital details and a direct link to the Hospital Carefinder application.
- *Explore the Map*: Interact with the map to explore different areas and navigate to nearby locations. You can zoom in, zoom out, and move around the map to find hospitals in specific areas or regions.
- *Responsive Design*: The application is designed to be responsive and accessible on various devices, including desktops, laptops, tablets, and mobile phones. It adapts to different screen sizes and provides an optimal user experience.

## Testing

Hospital Carefinder includes unit and component tests to ensure the reliability and correctness of its functionalities. To run the tests, use the following command:


npm run test


 ## The test suite utilizes Jest as the testing framework and includes tests for various components and functionalities of the application.








## Contributing

Contributions to Hospital Carefinder are welcome! If you would like to contribute to the project, please follow these steps:

1. Fork the repository on GitHub.
2. Create a new branch for your feature or bug fix.
3. Make the necessary changes in your branch.
4. Commit and push your changes to your forked repository.
5. Submit a pull request to the main repository, providing a detailed description of your changes and any relevant information.

## License

This project is licensed under the MIT License. You can find the full license information in the [LICENSE](LICENSE) file.
