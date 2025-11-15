🏭 VITROSAK Website — README

A modern, responsive, multilingual web application representing VITROSAK, a glass-processing factory specializing in automotive, architectural, and industrial glass solutions.
This website showcases the company’s products, capabilities, certifications, locations, and market presence through an elegant UI built with contemporary web development practices.

📌 Overview

The VITROSAK website includes:

A fully responsive Home Page, About Page, and Products Page

Dynamic content sections with smooth animations

Multi-language support (French, English, Chinese)

Product galleries with parallax sliders and auto-scroll effects

Updated company branding (logo, layout, contact info, HQ locations)

Mobile-optimized UI, including scroll-snap product cards

🚀 Key Features
1. Responsive Navigation Bar

Clean, minimalist design

“Language” dropdown with flags (FR, EN, CN)

“Contact Us” button with icon + dropdown showing complete contact information

Updated email: marketing@vitrosak.com

Logo replaced with the new PNG logo

2. Home Page

Updated onboarding section:

New hero text with blue gradient

Auto-scroll background images (buses & machinery)

Business-focused headline (“Glass Processing Factory”)

Product showcase with:

Parallax image sliders

Modern animations

Consolidated product categories (e.g., Tempered Glass, Glazing Glass)

Synchronized scroll effects for product visuals

3. About Page

Merged Quality page with About page

Displays:

“About VITROSAK”

“By Numbers”

“Certification Importance”

Certification card with certificate.pdf

Foundation date updated to 2004

Company presence updated to:

HQ: Sétif, Algeria

Showroom: Oran, Algeria

Export markets: Mauritania, Tunisia

4. Products Page

Products fully synced with Home Page content

New products added:

Tempered Glass (merged flat + curved)

Glazing Glass (merged double + triple)

Laminated Glass (updated images)

Glass Accessories (with Key Features, Applications, Specifications)

Catalogue download button for Glass Accessories

Enhanced product layout and animations

Mobile-optimized product cards:

Minimalist design

Full-screen scroll-snap behavior

Image slider on top, content below

No overflow or cut content

5. Footer

Updated theme and branding

Replaced logo with updated PNG

Organized two-column layout with:
Sétif HQ contact details
Oran Showroom contact details

Google Maps links included

6. Multilingual Support

All text and UI elements translate into French, English, and Chinese.
The language choice persists using local storage.

🛠️ Technologies Used

(Adapt or update based on your actual tech stack)

Frontend: React.js / Next.js

Styling: TailwindCSS, custom components, responsive layouts

Animation: Framer Motion, CSS transitions

Internationalization: i18next or next-i18next

Assets: PNG logos, PDF certificates, gallery photos

📂 Project Structure (Example)
/src
  /components
    Navbar/
    Footer/
    ProductCard/
    MobileProductCard/
    ParallaxSlider/
  /pages
    index.jsx
    about.jsx
    products.jsx
  /assets
    certificate.pdf
    logo.png
    contactSVG.png
    product-images/
  /locales
    /en
    /fr
    /cn
      translation.json

⚙️ Installation & Setup

Clone the project

git clone https://github.com/your-repo/vitrosak.git


Install dependencies

npm install


Run development server

npm run dev


Build for production

npm run build
npm start

🌍 Environment Variables

(Add any that apply)
Example:

NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_GOOGLE_MAPS_KEY=

📐 Design & UI Guidelines

Minimalist and clean

Blue color palette: #3477AC, #C5DBF0, #FFFFFF

Rounded corners, soft shadows

Large, readable typography

Mobile-first responsiveness

Smooth animations (parallax, fade, auto-scroll)

📘 Future Improvements

Add product search

Add downloadable catalogues for all product categories

Add interactive map for global presence

Add career/job openings page

🏷️ License

This project is proprietary and maintained by VITROSAK.
Not for public redistribution unless authorized.
