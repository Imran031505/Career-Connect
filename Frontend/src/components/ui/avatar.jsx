import * as React from "react";
import PropTypes from "prop-types"; // Importing PropTypes for props validation
import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { cn } from "@/lib/utils";

const Avatar = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

// Define propTypes for Avatar
Avatar.propTypes = {
  className: PropTypes.string, // Optional string prop
};

const AvatarImage = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

// Define propTypes for AvatarImage
AvatarImage.propTypes = {
  className: PropTypes.string, // Optional string prop
};

const AvatarFallback = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

// Define propTypes for AvatarFallback
AvatarFallback.propTypes = {
  className: PropTypes.string, // Optional string prop
};

export { Avatar, AvatarImage, AvatarFallback };
