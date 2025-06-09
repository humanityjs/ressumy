# 🤝 Contributing to Ressumy (WIP)

Thank you for your interest in contributing to Ressumy! We're excited to have you join our mission to help job seekers create stunning resumes with privacy-first, AI-powered tools.

## 🌟 Ways to Contribute

There are many ways to contribute to Ressumy:

- 🐛 **Bug Reports** - Help us identify and fix issues
- ✨ **Feature Requests** - Suggest new functionality
- 🎨 **Resume Templates** - Design new professional templates
- 💻 **Code Contributions** - Implement features, fix bugs, improve performance
- 📚 **Documentation** - Improve guides, add examples, fix typos
- 🧪 **Testing** - Help test new features and report feedback
- 🌐 **Translations** - Help make Ressumy accessible worldwide

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+** and npm/yarn
- **Git** for version control
- A code editor (we recommend VS Code with TypeScript extensions)

### Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/your-username/ressumy.git
   cd ressumy
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

5. **Verify Setup**
   - Open http://localhost:5173
   - Ensure the app loads correctly
   - Test template selection and basic functionality

## 📋 Development Guidelines

### Code Standards

We follow these coding standards to maintain consistency:

#### TypeScript & React
- **Strict TypeScript** - All code must be properly typed
- **Functional Components** - Use hooks instead of class components
- **Component Naming** - PascalCase for components, camelCase for functions
- **File Structure** - Each page has its own folder with components, hooks subdirectories

#### Styling
- **Tailwind CSS** - Use utility classes, avoid custom CSS when possible
- **shadcn/ui Components** - Prefer existing components before creating new ones
- **Dark Mode** - All components must support both light and dark themes
- **Responsive Design** - Mobile-first approach, test on all screen sizes

#### State Management
- **Zustand** - For global state (resume data, app settings)
- **React Hook Form** - For form handling with Yup validation
- **localStorage** - For persisting draft data
- **IndexedDB** - For caching templates and larger data

#### Animations
- **Framer Motion** - For complex animations and page transitions
- **CSS Transitions** - For simple hover effects (200-300ms duration)
- **Performance** - Use `transform` and `opacity` for better performance
- **Accessibility** - Respect `prefers-reduced-motion`

### Git Workflow

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/issue-description
   ```

2. **Make Commits**
   ```bash
   git add .
   git commit -m "feat: add new template preview feature"
   ```

3. **Conventional Commits**
   Use these prefixes:
   - `feat:` - New features
   - `fix:` - Bug fixes
   - `docs:` - Documentation changes
   - `style:` - Code style changes
   - `refactor:` - Code refactoring
   - `test:` - Adding tests
   - `chore:` - Maintenance tasks

4. **Push and Create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

## 🎨 Creating Resume Templates

Templates are a key part of Ressumy. Here's how to create new ones:

### Template Structure

```typescript
// src/templates/YourTemplate.tsx
import { ResumeData } from '@/stores/resumeStore';

interface TemplateProps {
  data: ResumeData;
}

export function YourTemplate({ data }: TemplateProps) {
  return (
    <div className="w-full max-w-[210mm] mx-auto bg-white text-black p-8">
      {/* Your template JSX */}
    </div>
  );
}
```

### Template Registration

```typescript
// src/templates/index.ts
export const templates: Template[] = [
  // ... existing templates
  {
    id: 'your-template',
    name: 'Your Template Name',
    description: 'Brief description of the template style',
    component: YourTemplate,
    thumbnail: '/thumbnails/your-template.png',
    isComingSoon: false
  }
];
```

### Template Guidelines

- **PDF Optimized** - Design for A4 paper size (210mm × 297mm)
- **Print Friendly** - Use print-safe colors and fonts
- **ATS Compatible** - Clean structure, readable fonts, logical sections
- **Responsive Data** - Handle missing/optional fields gracefully
- **Theme Support** - Template should work in both light/dark preview modes
- **Accessibility** - Proper heading hierarchy, good contrast

### Creating Thumbnails

1. Take a screenshot of your template with sample data
2. Resize to 400×600px (maintains 3:4 aspect ratio)
3. Save as PNG in `public/thumbnails/`
4. Optimize file size while maintaining quality

## 🐛 Reporting Issues

### Bug Reports

When reporting bugs, please include:

- **Clear Description** - What happened vs. what you expected
- **Steps to Reproduce** - Detailed steps to recreate the issue
- **Environment** - Browser, OS, screen size
- **Screenshots** - Visual evidence of the problem
- **Console Errors** - Any JavaScript errors in dev tools

### Feature Requests

For new features, please include:

- **Problem Statement** - What problem does this solve?
- **Proposed Solution** - How should it work?
- **Alternatives** - Other ways to solve the problem
- **User Impact** - Who would benefit from this feature?

## 🧪 Testing

### Manual Testing Checklist

Before submitting a PR, test these scenarios:

#### Core Functionality
- [ ] Resume creation and editing
- [ ] Template switching
- [ ] PDF export quality
- [ ] Data persistence (auto-save)
- [ ] Import/export JSON

#### Responsive Design
- [ ] Mobile devices (320px+)
- [ ] Tablet breakpoints
- [ ] Desktop layouts
- [ ] Print styles

#### Themes
- [ ] Light mode appearance
- [ ] Dark mode appearance
- [ ] Theme toggle functionality
- [ ] System preference detection

#### Performance
- [ ] Page load times
- [ ] Animation smoothness
- [ ] PDF generation speed
- [ ] Memory usage during long sessions

### Automated Testing

```bash
# Run type checking
npm run type-check

# Run linting
npm run lint

# Run tests (when available)
npm run test
```

## 📝 Pull Request Process

### Before Submitting

1. **Test Thoroughly** - Use the testing checklist above
2. **Update Documentation** - Add/update relevant docs
3. **Check Bundle Size** - Ensure no significant size increases
4. **Verify Accessibility** - Test with screen readers if UI changes

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Manual testing completed
- [ ] Responsive design verified
- [ ] Dark/light themes tested
- [ ] Performance impact assessed

## Screenshots
Add screenshots for UI changes

## Additional Notes
Any additional context or considerations
```

### Review Process

1. **Automatic Checks** - All CI checks must pass
2. **Code Review** - At least one maintainer approval required
3. **Testing** - Reviewer will test functionality
4. **Merge** - Squash and merge to main branch

## 🎯 Priority Areas

We're especially looking for help with:

### High Priority
- 🎨 **New Resume Templates** - Always needed!
- 🐛 **Bug Fixes** - Check our issues for bugs to fix
- 📱 **Mobile Improvements** - Better mobile UX
- ♿ **Accessibility** - Screen reader support, keyboard navigation

### Medium Priority
- 🌐 **Internationalization** - Multi-language support
- ⚡ **Performance** - Bundle size optimization, loading speed
- 🧪 **Testing** - Unit tests, integration tests
- 📚 **Documentation** - User guides, API docs

### Future Features
- 🔗 **LinkedIn Integration** - Import profile data
- 📊 **Analytics Dashboard** - Resume performance insights
- 🎯 **Job Matching** - AI-powered job recommendations
- 🔄 **Version Control** - Resume history and collaboration

## ❓ Getting Help

### Questions & Support

- **GitHub Discussions** - For general questions and ideas
- **GitHub Issues** - For bug reports and feature requests
- **Discord** - [Join our community](https://discord.gg/ressumy) for real-time chat

### Mentorship

New to open source? We offer mentorship for:
- First-time contributors
- Students learning web development
- Designers wanting to contribute templates
- Anyone passionate about helping job seekers

## 📄 Code of Conduct

We follow the [Contributor Covenant](https://www.contributor-covenant.org/) code of conduct. In summary:

- **Be Respectful** - Treat everyone with respect and kindness
- **Be Inclusive** - Welcome people of all backgrounds and experience levels
- **Be Constructive** - Provide helpful feedback and suggestions
- **Be Patient** - Remember that everyone is learning

## 🎉 Recognition

Contributors are recognized in:
- **README Credits** - Listed as project contributors
- **Release Notes** - Mentioned in feature announcements
- **Community Highlights** - Featured on our social media
- **Swag** - Ressumy stickers and merchandise for significant contributions

---

**Ready to contribute?** Start by browsing our [good first issues](https://github.com/your-username/ressumy/labels/good%20first%20issue) or join our [Discord community](https://discord.gg/ressumy)!

Thank you for helping make job searching easier for everyone! 🚀 