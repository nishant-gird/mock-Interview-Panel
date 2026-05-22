# How to Use Lovable UI with MIP Project

## 📌 What is Lovable?

**Lovable** is an AI-powered UI builder that lets you:
- Design beautiful React components visually
- Generate production-ready React/TypeScript code
- Export components directly to your project
- Prototype UIs quickly with AI assistance

---

## 🎯 3 Ways to Use Lovable with MIP

### **Option 1: Design Components in Lovable → Export to MIP** ⭐ RECOMMENDED

Best for: Creating beautiful UI components quickly

#### **Step 1: Open Lovable**
1. Go to [lovable.dev](https://lovable.dev)
2. Sign up / Log in
3. Create a new project

#### **Step 2: Design Your Component**
Example: Design a beautiful **Button** component

**In Lovable:**
- Drag and drop UI elements
- Style with Tailwind CSS
- Use the AI chat to refine ("Make this button more modern")
- Preview in real-time

#### **Step 3: Export Code**
1. Click **"Export"** button
2. Select **"React TypeScript"**
3. Copy the generated code

#### **Step 4: Add to Your MIP Project**
```bash
# Navigate to components
cd apps/web/src/components/ui
```

**Paste the exported code** into a new file:
```tsx
// apps/web/src/components/ui/LovableButton.tsx

// Paste exported code from Lovable here
export default function LovableButton() {
  // ...
}
```

#### **Step 5: Use in Your Pages**
```tsx
// apps/web/src/app/page.tsx
import LovableButton from '@/components/ui/LovableButton'

export default function LandingPage() {
  return (
    <div>
      <LovableButton />
    </div>
  )
}
```

---

### **Option 2: Full Page Design in Lovable → Export to MIP**

Best for: Designing entire pages at once

#### **Workflow:**

1. **In Lovable:**
   - Design your entire landing page / dashboard
   - Include all components (header, cards, buttons, etc.)
   - Use Lovable's AI: "Make this look like a professional SaaS dashboard"
   - Preview and iterate

2. **Export from Lovable:**
   ```
   Click "Export" → "React TypeScript" → "Copy All"
   ```

3. **Create new page in MIP:**
   ```bash
   # Create a new page file
   touch apps/web/src/app/lovable-page/page.tsx
   ```

4. **Paste the exported code:**
   ```tsx
   // apps/web/src/app/lovable-page/page.tsx
   'use client'
   
   // Paste entire exported code from Lovable
   export default function LovablePage() {
     return (
       // ...
     )
   }
   ```

5. **Access the page:**
   - Open http://localhost:3000/lovable-page

---

### **Option 3: Use Lovable as a Live Design Tool**

Best for: Rapid prototyping and getting design feedback

#### **Workflow:**

1. **Design in Lovable** - Create your UI mockups
2. **Share the Lovable link** - Get feedback from team members
3. **Iterate in Lovable** - Use AI suggestions to improve
4. **Export when ready** - Copy code and add to MIP when satisfied
5. **Customize in MIP** - Connect to your data/state

**Example:**
```
Team member: "The dashboard should have more charts"
You: Tell Lovable's AI: "Add 3 charts to the dashboard"
Lovable regenerates the UI automatically
Team sees the changes instantly
```

---

## 🔧 Integration Steps (Full Workflow)

### **Step 1: Install Lovable Dependencies (if needed)**

Most Lovable exports use standard React/Tailwind, so no extra deps needed!

But if your export uses special libraries:
```bash
pnpm install --filter @mip/web [library-name]
```

### **Step 2: Adjust Lovable Exports for Your Project**

Lovable exports might have different import paths. Update them:

```tsx
// LOVABLE EXPORT (default):
import Button from './Button'

// UPDATE FOR MIP:
import Button from '@/components/ui/Button'
```

### **Step 3: Connect to Your State**

Lovable components are static. Connect them to your data:

```tsx
// Lovable export with your state
'use client'

import { useState } from 'react'
import LovableForm from '@/components/lovable/LovableForm'

export default function MyPage() {
  const [formData, setFormData] = useState({})
  
  const handleSubmit = (data) => {
    setFormData(data)
    // Your logic here
  }
  
  return <LovableForm onSubmit={handleSubmit} />
}
```

### **Step 4: Style Consistency**

Make sure Lovable components use your design tokens:

```css
/* apps/web/src/app/globals.css */
:root {
  --primary: 212 74% 37%;        /* MIP primary blue */
  /* ... other tokens ... */
}
```

Lovable exports use Tailwind, so they'll automatically pick up your CSS variables!

---

## 📝 Practical Examples

### **Example 1: Design a Beautiful Dashboard Card in Lovable**

**In Lovable:**
1. Create new project
2. Drag a Card component
3. Add title, stats, chart placeholder
4. Style with Tailwind
5. AI prompt: "Make this card look like a KPI metric from a professional dashboard"

**Export and use in MIP:**
```tsx
// apps/web/src/components/lovable/DashboardCard.tsx
export default function DashboardCard({ title, value, delta }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="text-sm font-medium text-gray-600">{title}</h3>
      <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
      <p className="mt-2 text-sm text-green-600">{delta}</p>
    </div>
  )
}
```

**Use in Dashboard:**
```tsx
// apps/web/src/app/(app)/dashboard/page.tsx
import DashboardCard from '@/components/lovable/DashboardCard'

export default function Dashboard() {
  return (
    <div className="grid grid-cols-3 gap-6">
      <DashboardCard title="Sessions" value="24" delta="+12% this month" />
      <DashboardCard title="Avg Score" value="82" delta="+5% improvement" />
      <DashboardCard title="Streak" value="7 days" delta="Keep it up!" />
    </div>
  )
}
```

### **Example 2: Design Interview Report in Lovable**

**Lovable Prompt:**
> "Create a beautiful interview report card showing:
> - Overall score (big circle)
> - 5 skill categories with progress bars
> - Per-question feedback accordion
> - Download PDF button
> Make it look professional and polished"

**Lovable generates** → **Export** → **Paste into MIP**

```tsx
// apps/web/src/app/(app)/report/[id]/page.tsx
'use client'

import ReportCard from '@/components/lovable/ReportCard'

export default function ReportPage({ params }) {
  const reportData = {
    score: 82,
    verdict: 'Strong Hire',
    skills: {
      communication: 85,
      problemSolving: 78,
      technical: 88,
      systemDesign: 75,
      behavioral: 82
    }
  }
  
  return <ReportCard data={reportData} />
}
```

---

## 🚀 Quick Start: Use Lovable for MIP

### **5-Minute Setup:**

1. **Go to lovable.dev and create project** (1 min)
2. **Design one component** (2 min)
   - Prompt: "Create a modern purple and white login form with email, password, and sign in button"
3. **Export as React TypeScript** (1 min)
4. **Paste into MIP** (`apps/web/src/components/lovable/`) (1 min)

### **Use Lovable for Your Components:**

| Component | Use Lovable For? | Why |
|-----------|-----------------|-----|
| Button | ✅ Yes | Simple, quick, consistent styling |
| Input fields | ✅ Yes | Beautiful form design |
| Cards | ✅ Yes | Professional card layouts |
| Modals | ✅ Yes | Quick modal design |
| Sidebars | ✅ Yes | Complex navigation layouts |
| Landing page | ✅ Yes | Fast hero/CTA sections |
| Charts | ⚠️ Maybe | Export code, then integrate Recharts |
| Complex pages | ✅ Yes | Full page design at once |

---

## 🎨 Best Practices

### **DO:**
✅ Use Lovable for **visual components** (cards, buttons, forms, layouts)
✅ Export as **React TypeScript** to match your project
✅ Place Lovable exports in `/components/lovable/` directory
✅ Use your **design tokens** (colors) consistently
✅ Connect Lovable components to your **state and logic**
✅ **Iterate in Lovable** before exporting (faster than rebuilding)

### **DON'T:**
❌ Use Lovable exports without customizing paths
❌ Forget to add `'use client'` if components need interactivity
❌ Hardcode data in Lovable exports (pass as props)
❌ Ignore Tailwind conflicts with your design system
❌ Export and forget - always refactor for reusability

---

## 📂 Project Structure with Lovable

```
apps/web/src/components/
├── ui/                      # Original MIP components
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Input.tsx
│   └── ...
├── lovable/                 # Components from Lovable ⭐
│   ├── DashboardCard.tsx
│   ├── ReportCard.tsx
│   ├── LoginForm.tsx
│   ├── LandingHero.tsx
│   └── ...
├── layout/
│   ├── AppLayout.tsx
│   ├── Sidebar.tsx
│   └── Topbar.tsx
└── ...
```

---

## 🔗 Lovable Resources

- **Website:** [lovable.dev](https://lovable.dev)
- **Docs:** [Lovable Documentation](https://docs.lovable.dev)
- **Export Guide:** [Exporting React Code](https://docs.lovable.dev/export)
- **Tips:** Use AI prompts like:
  - "Make this more modern"
  - "Add more spacing"
  - "Use purple and blue colors"
  - "Make it look professional"

---

## 💡 Example Workflow for MIP

### **Scenario: Design the Interview Report Page**

1. **Open Lovable**
   ```
   lovable.dev → New Project → "Interview Report"
   ```

2. **Design the report**
   ```
   Drag components → Style with Tailwind → Preview
   ```

3. **Get AI to polish it**
   ```
   Prompt: "Make this report look professional, 
   add a circular progress for the score, 
   and make the skills section more visual"
   ```

4. **Export code**
   ```
   Export → React TypeScript → Copy
   ```

5. **Add to MIP**
   ```bash
   # Create file
   apps/web/src/components/lovable/ReportCard.tsx
   
   # Paste code
   # Add 'use client'
   # Update imports
   ```

6. **Use in MIP**
   ```tsx
   // apps/web/src/app/(app)/report/[id]/page.tsx
   import ReportCard from '@/components/lovable/ReportCard'
   
   export default function ReportPage({ params }) {
     return <ReportCard reportId={params.id} />
   }
   ```

7. **Run dev server**
   ```bash
   pnpm dev
   # Visit http://localhost:3000/report/123
   ```

---

## ✨ Why Use Lovable for MIP?

- ⚡ **Fast:** Design visually, not by coding
- 🎨 **Beautiful:** AI-powered design suggestions
- 📦 **Export-ready:** React code ready to use
- 🔄 **Iterate quickly:** Change designs in seconds
- 🧩 **Reusable:** Export components multiple times
- 🤝 **Team-friendly:** Share links for feedback

---

## 🎯 Next Steps

1. **Visit lovable.dev**
2. **Create a new project**
3. **Design 1 component** (e.g., a button or card)
4. **Export as React**
5. **Paste into MIP at `apps/web/src/components/lovable/`**
6. **Run `pnpm dev` and see it work!**

**That's it!** You're now using Lovable with MIP! 🚀

---

**Questions?** The Lovable docs are great: https://docs.lovable.dev
