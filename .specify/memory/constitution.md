# CursoReact Constitution

<!--
# Sync Impact Report
- Version change: 0.0.0 → 1.0.0 (MAJOR: Initial constitution adoption)
- Modified principles: None (first release)
- Added sections: All core sections
- Removed sections: None
- Templates requiring updates: ✅ plan-template.md, spec-template.md, tasks-template.md reviewed and aligned
- Follow-up TODOs: None
-->

## Core Principles

### I. Component-First Architecture
All UI functionality begins as isolated, reusable components stored in `src/componentes/`. Components must be self-contained with their own CSS files, independently testable, and fully documented with JSDoc comments. Every component has a clear, single responsibility with no cross-cutting concerns.

### II. React Hooks for State Management
State is managed exclusively using React hooks (useState, useContext) and functional components. No class components unless absolutely necessary. Context API is used for state that crosses more than 2 component levels. This ensures consistent, predictable state management patterns across the project.

### III. Validation-First Development (NON-NEGOTIABLE)
Form inputs and user-entered data MUST be validated before submission. Validation is performed on form submission (not on blur) with clear, user-friendly error messages displayed in Portuguese. Required fields are marked and cannot be submitted empty.

### IV. Accessibility as a Core Feature
All interactive components must support keyboard navigation, screen readers, and semantic HTML. WCAG 2.1 Level A compliance is mandatory. ARIA labels are added where needed, and alt text is provided for all images. This is not optional—it's part of the definition of done.

### V. Performance and Bundle Efficiency
Applications must load within 3 seconds on 4G networks. Bundle size must stay under 500KB (gzipped). Lazy loading is applied to components not visible on initial render. CSS is kept efficient with no unnecessary inline styles. This ensures fast, responsive user experiences.

## Technology Standards

- **Framework**: React 18+
- **Build Tool**: Create React App (CRA) or Vite
- **Package Manager**: npm or yarn
- **Node.js**: LTS version (18+ recommended)
- **CSS**: Plain CSS only (no preprocessors without justification)
- **Component Library**: Custom components (no heavy third-party UI libraries)
- **Production Build**: Minified with optimized assets, ready for static hosting

## Security Requirements

- No sensitive data (API keys, tokens, credentials) in source code—use .env files (excluded from git)
- All user input sanitized before rendering to prevent XSS attacks
- Implement Content Security Policy (CSP) headers when deployed
- Regular dependency audits: `npm audit` before every release
- Remove unused dependencies to minimize attack surface

## Coding Standards

- **Component Naming**: PascalCase (e.g., `Colaborador.js`)
- **File Structure**: `ComponentName/ComponentName.js`, `ComponentName.css`, `index.js`
- **Props Validation**: PropTypes or JSDoc comments required for all props
- **Functional Components**: Hooks-based only; no class components
- **Maximum Function Length**: 150 lines; extract smaller functions if exceeded
- **Naming**: Portuguese or English (consistent within project)
- **CSS Co-location**: CSS files live alongside components
- **Logging**: Structured logging for development; console.log only in dev mode
- **Test Coverage**: Minimum 70% for utility functions

## Component Architecture Standards

- Each component in `src/componentes/` has its own folder
- Props drilling limited to 2 levels; use Context API for deeper hierarchies
- Reusable components in `componentes/`; page-specific logic higher up
- Components follow single-responsibility principle
- All components have default exports and index.js files

## Compliance and Governance

### Accessibility
- Support WCAG 2.1 Level A minimum compliance
- Keyboard navigation for all interactive components
- Semantic HTML (button, form, label, etc.)
- Alt text for all images in `public/Imagens/`
- Screen reader support with appropriate ARIA labels

### Documentation
- All components documented with JSDoc comments (parameters, return values, usage examples)
- Maintain CHANGELOG.md for version history

### Code Review & Git Workflow
- Feature branches required for all development
- Code review mandatory before merging to main/master
- Commit messages in English
- Dependencies from reputable npm sources only
- Quarterly dependency updates and monitoring

## Build and Deployment

- **Build Command**: `npm run build`
- **Test Command**: `npm test`
- **Dev Server**: `npm start`
- **Production Builds**: Must pass linting without warnings
- **Asset Optimization**: Images compressed, unused code removed
- **Deployment Target**: Static hosting (GitHub Pages, Vercel, Netlify, etc.)

## Governance

This constitution supersedes all other project guidelines and practices. All team members and AI assistants must verify compliance with these principles during code review and feature development.

**Amendment Process**: Propose changes in a pull request with full justification. Amendments require at least one approval and must include migration guidance for existing code.

**Compliance Verification**: Every PR must reference which principles it follows. Violations require explicit justification or must be corrected before merge.

**Runtime Guidance**: Refer to [CONSTITUTION.md](./ExplicacaoSDD/Constitution.md) for detailed implementation guidance and examples.

---

**Version**: 1.0.0 | **Ratified**: 2026-07-24 | **Last Amended**: 2026-07-24
