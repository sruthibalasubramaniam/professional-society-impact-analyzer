export const societies = [
  { id: 1, name: "IEEE", members: 145, events: 12, avgImpact: 8.2 },
  { id: 2, name: "ACM", members: 98, events: 9, avgImpact: 7.8 },
  { id: 3, name: "CSI", members: 120, events: 11, avgImpact: 7.5 },
  { id: 4, name: "ISTE", members: 85, events: 7, avgImpact: 8.0 },
];

export const events = [
  { id: 1, name: "AI Workshop", society: "IEEE", date: "2025-11-15", participants: 72, feedback: 4.5, type: "Workshop", impactScore: 8.7 },
  { id: 2, name: "Hackathon 2025", society: "ACM", date: "2025-10-20", participants: 120, feedback: 4.8, type: "Hackathon", impactScore: 9.2 },
  { id: 3, name: "Cloud Seminar", society: "CSI", date: "2025-09-10", participants: 55, feedback: 4.1, type: "Seminar", impactScore: 7.3 },
  { id: 4, name: "IoT Bootcamp", society: "IEEE", date: "2025-08-25", participants: 40, feedback: 4.3, type: "Workshop", impactScore: 7.9 },
  { id: 5, name: "Web Dev Marathon", society: "ISTE", date: "2025-12-01", participants: 88, feedback: 4.6, type: "Hackathon", impactScore: 8.5 },
  { id: 6, name: "Cybersecurity Talk", society: "CSI", date: "2025-07-18", participants: 65, feedback: 4.0, type: "Seminar", impactScore: 7.1 },
];

export const monthlyParticipation = [
  { month: "Jul", IEEE: 40, ACM: 25, CSI: 35, ISTE: 20 },
  { month: "Aug", IEEE: 55, ACM: 30, CSI: 40, ISTE: 28 },
  { month: "Sep", IEEE: 48, ACM: 42, CSI: 55, ISTE: 32 },
  { month: "Oct", IEEE: 60, ACM: 120, CSI: 38, ISTE: 45 },
  { month: "Nov", IEEE: 72, ACM: 35, CSI: 50, ISTE: 40 },
  { month: "Dec", IEEE: 65, ACM: 48, CSI: 45, ISTE: 88 },
];

export const skillMetrics = [
  { skill: "Technical", before: 45, after: 78 },
  { skill: "Leadership", before: 30, after: 62 },
  { skill: "Communication", before: 50, after: 72 },
  { skill: "Teamwork", before: 55, after: 85 },
  { skill: "Problem Solving", before: 40, after: 75 },
];

export const eventTypes = [
  { name: "Workshop", value: 35 },
  { name: "Hackathon", value: 25 },
  { name: "Seminar", value: 22 },
  { name: "Community", value: 18 },
];

export const students = [
  { id: 1, name: "Sruthi", regNo: "3122235002134", society: "IEEE", events: 8, impactScore: 8.5 },
  { id: 2, name: "Balasubramanian", regNo: "3122235002137", society: "ACM", events: 6, impactScore: 7.9 },
  { id: 3, name: "Suriya N", regNo: "3122235002137", society: "CSI", events: 9, impactScore: 8.8 },
  { id: 4, name: "PV Rishwanth Reddy", regNo: "3122235002151", society: "IEEE", events: 7, impactScore: 8.1 },
  { id: 5, name: "Vihashni R", regNo: "3122235002153", society: "ISTE", events: 5, impactScore: 7.4 },
  { id: 6, name: "Rahul N", regNo: "3122235002311", society: "ACM", events: 10, impactScore: 9.0 },
  { id: 7, name: "Vasanthan", regNo: "3122235002314", society: "CSI", events: 7, impactScore: 8.2 },
];
