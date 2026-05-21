# Contributing to MailFlow

Thank you for your interest in contributing to MailFlow! We appreciate community contributions that help improve our BFSI email marketing platform.

## 📋 Code of Conduct

By participating in this project, you agree to maintain a respectful and professional environment.

## 🚀 Getting Started

### Development Setup

```bash
# Clone your fork
git clone https://github.com/your-username/MailFlow.git
cd MailFlow

# Create feature branch
git checkout -b feature/your-feature

# Install dependencies
npm install

# Create .env.local from template
cp .env.example .env.local

# Start development server
npm run dev
```

## 💡 How to Contribute

### Report Issues
1. Check [existing issues](https://github.com/Hitpragya/MailFlow/issues)
2. [Create new issue](https://github.com/Hitpragya/MailFlow/issues/new)
3. Include: description, reproduction steps, expected behavior

### Suggest Enhancements
1. [Open feature request](https://github.com/Hitpragya/MailFlow/issues/new?template=feature_request.md)
2. Describe use case and benefits
3. Provide implementation suggestions

### Submit Code

**Branch Naming:**
```
feature/description       - New feature
fix/bug-name             - Bug fix
docs/improvement         - Documentation
refactor/component-name  - Code refactoring
perf/optimization        - Performance improvement
```

**Commit Messages:**
```
feat(agents): add new planner agent feature
fix(compliance): resolve RBI validation error
docs(readme): update installation instructions
refactor(components): simplify dashboard layout
perf(api): optimize Claude API calls
```

**Pull Request:**
1. Fill PR template completely
2. Link related issues
3. Provide clear description
4. Ensure all tests pass
5. Request review

## 🎨 Code Standards

### React Components
```typescript
// Use TypeScript for type safety
interface ComponentProps {
  title: string;
  onAction: (id: string) => Promise<void>;
}

// Functional components with hooks
export const CampaignCard: React.FC<ComponentProps> = ({ title, onAction }) => {
  const [loading, setLoading] = React.useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      await onAction("id");
    } finally {
      setLoading(false);
    }
  };

  return <div onClick={handleClick}>{title}</div>;
};
```

### Services & Utilities
```typescript
// Clear naming and documentation
/**
 * Validates email against BFSI compliance rules
 * @param email - Email content to validate
 * @returns Compliance check result
 */
export async function validateComplianceService(
  email: EmailContent
): Promise<ComplianceResult> {
  // Implementation
}
```

### Styling
- Use Tailwind CSS for styling
- Follow design system colors (see constants/colors.js)
- Maintain dark mode support
- Mobile-responsive by default

## ✅ Before Submitting PR

```bash
npm run lint       # Check code style
npm run format     # Auto-format code
npm run build      # Verify build succeeds
npm run preview    # Test production build
```

## 📝 Documentation

- Update README.md for major changes
- Add JSDoc comments for functions
- Document new environment variables
- Include usage examples

## 🔍 Review Process

1. **Automated Checks**
   - ESLint validation
   - TypeScript compilation
   - Build verification

2. **Maintainer Review**
   - Code quality
   - BFSI compliance
   - Performance impact
   - Security considerations

3. **Approval & Merge**
   - Minimum 1 approval
   - All checks passing
   - No merge conflicts

## 🎯 Priority Areas

We especially welcome contributions in:
- New compliance rules (RBI, SEBI, IRDAI)
- Additional AI agent capabilities
- Analytics enhancements
- UI/UX improvements
- Bug fixes
- Documentation

## 📚 Learning Resources

- [Claude API Documentation](https://docs.anthropic.com)
- [React 18 Guide](https://react.dev)
- [BFSI Compliance Overview](https://www.sebi.gov.in)
- [Email Marketing Best Practices](#)

## ❓ Questions?

- 💬 [GitHub Discussions](https://github.com/Hitpragya/MailFlow/discussions)
- 📧 Email: support@mailflow.dev
- 🐛 [Open an Issue](https://github.com/Hitpragya/MailFlow/issues)

---

**Thank you for contributing to MailFlow! 🚀**
