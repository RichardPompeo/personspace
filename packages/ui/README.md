# UI Package

A shared UI component library built with React, TypeScript, and shadcn/ui components. This package provides reusable, accessible, and customizable components for the PersonSpace project.

## Features

- 🎨 Built with Tailwind CSS v4 and shadcn/ui design system
- ♿ Accessible components using Radix UI primitives
- 🎯 TypeScript support with full type definitions
- 🔧 Customizable with class-variance-authority
- 📦 Tree-shakeable exports

## Components

### Form Components

#### Button
A versatile button component with multiple variants and sizes.

```tsx
import { Button } from "ui";

<Button variant="default" size="md">Click me</Button>
<Button variant="destructive" size="lg">Delete</Button>
<Button variant="outline" size="sm">Cancel</Button>
<Button variant="ghost">Ghost</Button>
```

**Variants:** `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`
**Sizes:** `default`, `sm`, `lg`, `icon`, `icon-sm`, `icon-lg`

#### Input
A styled input field component.

```tsx
import { Input } from "ui";

<Input type="text" placeholder="Enter text..." />
<Input type="email" placeholder="Email" />
```

#### Label
A form label component with accessibility support.

```tsx
import { Label, Input } from "ui";

<Label htmlFor="email">Email</Label>
<Input id="email" type="email" />
```

#### Textarea
A multiline text input component.

```tsx
import { Textarea } from "ui";

<Textarea placeholder="Enter description..." rows={4} />
```

#### Switch
A toggle switch component.

```tsx
import { Switch, Label } from "ui";

<div className="flex items-center gap-2">
  <Switch id="notifications" />
  <Label htmlFor="notifications">Enable notifications</Label>
</div>
```

### Layout Components

#### Card
A container component for grouping related content.

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "ui";

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description goes here</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

#### SidebarNav
A navigation sidebar component.

```tsx
import { SidebarNav } from "ui";

const sections = [
  {
    id: "main",
    title: "Main",
    items: [
      { id: "home", label: "Home", icon: <HomeIcon />, to: "/" },
      { id: "about", label: "About", icon: <InfoIcon />, to: "/about" },
    ],
  },
];

<SidebarNav
  isOpen={isOpen}
  brand={{ logoSrc: "/logo.svg", label: "MyApp" }}
  sections={sections}
/>
```

#### UtilityBar
A utility bar for user actions and authentication.

```tsx
import { UtilityBar } from "ui";

<UtilityBar
  isLoggedIn={isLoggedIn}
  onSignInClick={() => navigate("/login")}
  onSignUpClick={() => navigate("/register")}
  onLogout={() => logout()}
  onProfileClick={() => navigate("/profile")}
  userName={user?.name}
  userEmail={user?.email}
  labels={{
    signIn: "Sign In",
    signUp: "Sign Up",
    popoverTitle: "Account",
    popoverProfile: "Profile",
    popoverLogout: "Logout",
    openUserActions: "Open user menu",
    openProfileMenu: "Open profile menu",
  }}
/>
```

### Feedback Components

#### Alert
A component for displaying important messages.

```tsx
import { Alert, AlertTitle, AlertDescription } from "ui";

<Alert variant="default">
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>Important information here.</AlertDescription>
</Alert>

<Alert variant="destructive">
  <AlertDescription>Error message</AlertDescription>
</Alert>

<Alert variant="success">
  <AlertDescription>Success message</AlertDescription>
</Alert>
```

**Variants:** `default`, `destructive`, `success`, `warning`

#### Spinner
A loading spinner component.

```tsx
import { Spinner } from "ui";

<Spinner size="md" />
<Spinner size="lg" label="Loading..." />
<Spinner size="sm" variant="accent" />
```

**Sizes:** `sm`, `md`, `lg`, `xl`
**Variants:** `default`, `accent`, `muted`, `destructive`

#### Toaster
A toast notification system using Sonner.

```tsx
import { Toaster } from "ui";
import { toast } from "sonner";

// Add to your app root
<Toaster />

// Use anywhere in your app
toast.success("Successfully saved!");
toast.error("Something went wrong");
toast.info("New update available");
```

#### Badge
A small status indicator or label.

```tsx
import { Badge } from "ui";

<Badge variant="default">Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Error</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
```

**Variants:** `default`, `secondary`, `destructive`, `outline`, `success`, `warning`

### Overlay Components

#### Dialog
A modal dialog component.

```tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "ui";

<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>Dialog description goes here.</DialogDescription>
    </DialogHeader>
    <div>Dialog content</div>
    <DialogFooter>
      <Button variant="outline">Cancel</Button>
      <Button>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

## Styling

### Importing Styles

Import the base styles in your application:

```tsx
import "ui/styles";
```

### Customization

The components use CSS variables for theming. Customize by overriding these variables in your application's CSS:

```css
:root {
  --radius: 0.5rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  /* ... more variables */
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  /* ... dark mode overrides */
}
```

## TypeScript

All components are fully typed. Import types as needed:

```tsx
import { ButtonProps, InputProps, CardProps } from "ui";
```

## Dependencies

### Peer Dependencies
- `react` ^19.1.1
- `react-dom` ^19.1.1

### Main Dependencies
- `@radix-ui/react-dialog`
- `@radix-ui/react-label`
- `@radix-ui/react-slot`
- `@radix-ui/react-switch`
- `class-variance-authority`
- `clsx`
- `lucide-react`
- `react-router-dom`
- `sonner`
- `tailwind-merge`
- `tailwindcss` v4

## Development

```bash
# Install dependencies
yarn install

# Lint
yarn lint

# Build (if configured)
yarn build
```

## Architecture

The package follows shadcn/ui conventions:
- Components are built using Radix UI primitives for accessibility
- Styling is done with Tailwind CSS utilities
- Variants are managed with class-variance-authority
- Variants are separated into their own files to support Fast Refresh

## Contributing

When adding new components:
1. Create the component in `src/components/ui/`
2. If using CVA variants, create a separate `-variants.ts` file
3. Export the component in `src/index.tsx`
4. Update this README with usage examples
5. Ensure TypeScript types are exported

## License

Private package for PersonSpace project.