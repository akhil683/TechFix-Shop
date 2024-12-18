# TechFix Repair

- Hi, My name is Akhil and this is the comprehensive documentation of my project.
- TechFix Repair is a web application designed to help repair shops efficiently manage their employees and customers. With robust authentication, authorization, and data management features, this project provides a seamless user experience for both managers and employees.

---
![Landing Page](/public/readme/hero.png)

## Features

### Authentication and Authorization
- **Authentication**: Powered by [Kinde Auth](https://kinde.com/) for secure login.
- **Authorization**:
  - **Manager**: Can assign and edit tickets, create customers, and view all data.
  - **Employee**: Can view assigned tickets and customers only.

### Ticket and Customer Management
- Managers can:
  - Assign and edit tickets for employees.
  - Create and manage customer information.
- Employees can:
  - View their assigned tickets.
  - Access the list of customers.

### Table Display
- Built using [TanStack Table](https://tanstack.com/table):
  - Scalable filtering, sorting, pagination, and searching capabilities.
  - Dynamic and responsive table layouts for tickets and customers.
![Display Table](/public/readme/table.png)

### Form Handling
- **Validation**: Implemented with [Zod](https://zod.dev/) and [React Hook Form](https://react-hook-form.com/).
- User-friendly and secure form submission process.
![Display Form](/public/readme/edit.png)

### Database Interaction
- **ORM**: [Drizzle ORM](https://github.com/drizzle-team/drizzle-orm) for database operations.
- **Database**: [NeonDB](https://neon.tech/) for hosting PostgreSQL database.

### Theming
- Supports **Dark**, **Light**, and **System Preferred** themes using [next-themes](https://github.com/pacocoursey/next-themes).

### Animations
- Smooth UI transitions with [Motion](https://www.motion.dev).

### UI Components
- Built with [Shadcn UI](https://shadcn.dev/) for reusable and accessible components.

### Error Tracking
- Integrated with [Sentry](https://sentry.io/) for monitoring and error tracking.

---

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Database**: PostgreSQL (via [NeonDB](https://neon.tech/))
- **ORM**: [Drizzle ORM](https://github.com/drizzle-team/drizzle-orm)
- **Form Validation**: [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/)
- **Authentication**: [Kinde Auth](https://kinde.com/)
- **Theming**: [next-themes](https://github.com/pacocoursey/next-themes)
- **Table Management**: [TanStack Table](https://tanstack.com/table)
- **UI Components**: [Shadcn UI](https://shadcn.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Error Tracking**: [Sentry](https://sentry.io/)
- **Secure Actions**: [next-safe-action](https://github.com/luciancaetano/next-safe-action)

---

## Environment Variables

These are the environment variables I have used in my project. Add them to your `.env.local` file:

```env
SENTRY_AUTH_TOKEN=

KINDE_CLIENT_ID=
KINDE_CLIENT_SECRET=
KINDE_ISSUER_URL=
KINDE_SITE_URL=
KINDE_POST_LOGOUT_REDIRECT_URL=
KINDE_POST_LOGIN_REDIRECT_URL=

KINDE_DOMAIN=
KINDE_MANAGEMENT_CLIENT_ID=
KINDE_MANAGEMENT_CLIENT_SECRET=

DATABASE_URL=
```

---

## Installation and Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/akhil683/TechFix-Shop.git
   cd techfix-repari
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env.local` file in the root of the project and add the required variables.

4. **Run Database Migrations**:
   ```bash
   npx drizzle-kit up
   ```

5. **Start the Development Server**:
   ```bash
   npm run dev
   ```

6. **Access the Application**:
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Contributing
Contributions are welcome! Feel free to open issues or submit pull requests to enhance the functionality of this project.

---

## Acknowledgements
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Kinde Auth](https://kinde.com/)
- [Drizzle ORM](https://github.com/drizzle-team/drizzle-orm)
- [TanStack Table](https://tanstack.com/table)
- [Shadcn UI](https://shadcn.dev/)
- [Framer Motion](https://www.framer.com/motion/)
 
