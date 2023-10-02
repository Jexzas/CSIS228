"use strict";
/*    JavaScript 7th Edition
      Chapter 6
      Chapter case

      Order Form Code
      Author: Jesse Roberts
      Date:   09/29/23

      Filename: js06a.js
 */

window.addEventListener("load", () => {
      let orderForm = document.forms.orderForm;
      let model = orderForm.elements.model;

      // Model selection list
      model.focus();

      // Calculate order cost
      calcOrder();

      // fire function on any form change
      // I added this like 11 minutes into the video because it was bothering me that the form didn't change automatically

      document.querySelector("#orderForm").addEventListener("change", calcOrder;
      })

      // Also at 11:00 I added toFixed to all of the totals because it was annoying me that the money was to many decimal places 
      // Why doesn't JS have a format money method (like PHP and SQL)?
      // As soon as I resumed the video you mentioned this problem 
      
      function calcOrder () {
            // determine model
            let mIndex = model.selectedIndex;
            let mValue = model.options[mIndex].value;

            // determine quantity
            let qIndex = orderForm.elements.qty.selectedIndex;
            let quantity = orderForm.elements.qty[qIndex].value;

            // model cost
            let modelCost = mValue * quantity;
            orderForm.elements.modelCost.value = modelCost.toFixed(2);

            // cost of protection plan
            let planValue = document.querySelector('input[name="plan"]:checked').value;
            
            // add plan to each item
            let planCost = planValue * quantity;
            orderForm.elements.planCost.value = planCost;

            // calculate subtotal
            let subtotal = modelCost + planCost;
            orderForm.elements.subtotal.value = subtotal.toFixed(2);

            // sales tax
            const taxRate = .05;
            let salesTax = subtotal * taxRate;
            orderForm.elements.salesTax.value = salesTax.toFixed(2);

            // total cost
            let totalCost = subtotal + salesTax;
            orderForm.elements.totalCost.value = totalCost.toFixed(2);

            orderForm.elements.modelName.value = model.options[mIndex].text;
            let selectedPlan = document.querySelector('input[name="plan"]:checked');
            orderForm.elements.planName.value = selectedPlan.labels[0].textContent;
      }
})
