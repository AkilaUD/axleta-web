---
title: How to clearly identify the "Cancellation" document in SAP Business One
publishedAt: 2022-02-11
category: SAP Business One
excerpt: Use separate number series and document setup so cancellation documents are easy to find in SAP Business One queries and reports.
originalUrl: https://blog.axleta.com/2022/02/how-to-clearly-identify-cancellation-document.html
---

When you cancel an AR or AP document in SAP Business One, the cancellation document shows as closed with status **Cancellation**, and the original document shows **Canceled**. Reporting is harder if both look like ordinary postings in the same number series.

## Number series

Configure a **separate number series** for cancellation documents during implementation. Otherwise cancellations inherit the standard series and are difficult to distinguish in queries.

## Document numbering setup

In **Document Numbering – Setup**, use the **Cancellation** option under the relevant document types so cancellations follow a predictable pattern.

## Reporting practice

Build queries that join original and cancellation documents on linked keys rather than visually scanning document lists. Train users on which series indicates a reversal.

If you are planning a new SAP Business One deployment, decide cancellation numbering early—it is inexpensive to configure up front and costly to untangle later.
