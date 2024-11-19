# Cloudinary Image Gallery

A minimal React application demonstrating Cloudinary integration for image uploads with tagging and search capabilities.

## Setup

1. **Clone the repository**

```bash
git clone <repository-url>
cd cloudinary-gallery
```

2. **Install dependencies**

```bash
npm install
```

3. **Cloudinary Setup**

You'll need a Cloudinary account. Once you have one:

a. Get your credentials from the Cloudinary Dashboard:

- Cloud Name
- API Key
- API Secret

b. Create an Upload Preset:

- Go to Settings > Upload in your Cloudinary dashboard
- Click "Add upload preset"
- Set a name for your preset
- Choose "Unsigned" if you want to allow direct uploads from the browser
- Configure any additional settings (file restrictions, transformations, etc.)
- Save the preset

4. **Environment Variables**

Create a `.env` file in the project root:

```plaintext
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_API_KEY=your_api_key
VITE_CLOUDINARY_API_SECRET=your_api_secret
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset_name
```

5. **Start the development server**

```bash
npm run dev
```

## Features

- Image upload with automatic tagging
- Search images by tag
- Responsive image display
- Uses Cloudinary's React SDK for optimized image delivery

## Project Structure

```
├── src/
│   ├── components/
│   │   └── ImageUploader.jsx    # Main component for upload/display
│   ├── services/
│   │   └── cloudinaryService.js # Cloudinary API integration
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env
├── index.html
├── package.json
└── vite.config.js
```

## Technology Stack

- React
- Vite
- Cloudinary React SDK
- @cloudinary/url-gen

## Security Notes

- Never commit your `.env` file to version control
- The upload preset should be configured with appropriate restrictions
- For production applications, consider implementing server-side authentication

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Cloudinary for their excellent SDK and documentation
- React team for the framework
- Vite team for the build tool
