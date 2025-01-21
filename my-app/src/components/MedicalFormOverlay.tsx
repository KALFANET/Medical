'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

export default function MedicalFormOverlay() {
  const [formData, setFormData] = useState({
    idNumber: '',
    licenseClass: '',
    driverLicenseNumber: '',
    birthYear: '',
    renewalDate: '',
    restrictions: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handlePrint = () => {
    const printContent = document.createElement('div');
    
    printContent.innerHTML = `
      <div style="position: relative; width: 210mm; height: 297mm;">
        <!-- הטופס כתמונת רקע -->
        <img 
          src="/medical-form.png" 
          style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1;"
        />
        
        <!-- שכבת הטקסט מעל הטופס -->
        <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 2;">
          <!-- מספר זהות -->
          <div style="position: absolute; top: 2cm; right: 16cm; font-family: monospace; font-size: 12px;">
            ${formData.idNumber}
          </div>
          
          <!-- דרגת רישיון -->
          <div style="position: absolute; top: 45px; right: 180px; font-family: monospace; font-size: 12px;">
            ${formData.licenseClass}
          </div>
          
          <!-- מספר רישיון נהיגה -->
          <div style="position: absolute; top: 75px; right: 45px; font-family: monospace; font-size: 12px;">
            ${formData.driverLicenseNumber}
          </div>
          
          <!-- שנת לידה -->
          <div style="position: absolute; top: 75px; right: 180px; font-size: 12px;">
            ${formData.birthYear}
          </div>
          
          <!-- תאריך חידוש -->
          <div style="position: absolute; top: 45px; right: 320px; font-size: 12px;">
            ${formData.renewalDate}
          </div>
  
          <!-- הגבלות -->
          ${formData.restrictions.split(' ').map((restriction, index) => `
            <div style="position: absolute; top: ${400 + (index * 22)}px; right: 75px; font-family: monospace; font-size: 12px;">
              ${restriction}
            </div>
          `).join('')}
        </div>
      </div>
    `;
  
    const style = document.createElement('style');
    style.textContent = `
      @media print {
        body { margin: 0; padding: 0; }
        @page { size: A4; margin: 0; }
        div { -webkit-print-color-adjust: exact; }
      }
    `;
    
    const originalContent = document.body.innerHTML;
    document.head.appendChild(style);
    document.body.innerHTML = printContent.innerHTML;
  
    setTimeout(() => {
      window.print();
      document.body.innerHTML = originalContent;
      document.head.removeChild(style);
      window.location.reload();
    }, 200000); // הגדלתי את זמן ההמתנה ל-2 שניות
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="space-y-2 text-right">
              <label className="text-sm">מספר זהות</label>
              <Input
                type="text"
                name="idNumber"
                value={formData.idNumber}
                onChange={handleChange}
                className="text-right font-mono"
                dir="rtl"
                maxLength={9}
              />
            </div>
            <div className="space-y-2 text-right">
              <label className="text-sm">דרגת רישיון</label>
              <Input
                type="text"
                name="licenseClass"
                value={formData.licenseClass}
                onChange={handleChange}
                className="text-right"
                dir="rtl"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="space-y-2 text-right">
              <label className="text-sm">מספר רישיון נהיגה</label>
              <Input
                type="text"
                name="driverLicenseNumber"
                value={formData.driverLicenseNumber}
                onChange={handleChange}
                className="text-right font-mono"
                dir="rtl"
                maxLength={5}
              />
            </div>
            <div className="space-y-2 text-right">
              <label className="text-sm">שנת לידה</label>
              <Input
                type="text"
                name="birthYear"
                value={formData.birthYear}
                onChange={handleChange}
                className="text-right"
                dir="rtl"
                maxLength={4}
              />
            </div>
            <div className="space-y-2 text-right">
              <label className="text-sm">תאריך חידוש</label>
              <Input
                type="text"
                name="renewalDate"
                value={formData.renewalDate}
                onChange={handleChange}
                className="text-right"
                dir="rtl"
                placeholder="MM/YY"
                maxLength={5}
              />
            </div>
          </div>

          <div className="space-y-2 text-right">
            <label className="text-sm">הגבלות (הפרד מספרים עם רווח)</label>
            <Input
              type="text"
              name="restrictions"
              value={formData.restrictions}
              onChange={handleChange}
              className="text-right font-mono"
              dir="rtl"
              placeholder="לדוגמא: 244 420 317"
            />
          </div>

          <div className="mt-6 flex justify-center">
            <Button 
              onClick={handlePrint}
              type="button"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              הדפסת הטופס
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* תצוגה מקדימה של הטופס */}
      <div className="hidden print:block">
        <embed 
          src="/medical-form.pdf"
          type="application/pdf"
          style={{ width: '100%', height: '100vh' }}
        />
      </div>
    </div>
  );
}