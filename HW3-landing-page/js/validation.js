
export function validateFormData(formData) {
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
  
    if (name.length === 0 || name.length > 80) {
      return { valid: false, message: "Name must be between 1 and 80 characters." };
    }
  
    if (email.length === 0 || email.length > 254) {
      return { valid: false, message: "Please provide a valid email address." };
    }
  
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return { valid: false, message: "Please provide a valid email address." };
    }
  
    return {
      valid: true,
      data: { name, email }
    };
  }
  