// Central Academic Hierarchy & Unified Search Database

export const academicHierarchy = {
  university: {
    id: 'iiuc',
    name: 'International Islamic University Chittagong',
    shortName: 'IIUC',
    href: '/hierarchy',
    type: 'University'
  },
  departments: [
    {
      id: 'cse',
      name: 'Department of Computer Science & Engineering',
      shortName: 'CSE',
      href: '/departments/cse',
      head: 'Prof. Dr. Tariqul Islam',
      semesters: ['fall-2026', 'spring-2026', 'fall-2025']
    },
    {
      id: 'math',
      name: 'Department of Mathematics & Data Science',
      shortName: 'MATH',
      href: '/departments/math',
      head: 'Prof. Eleanor Vance',
      semesters: ['fall-2026', 'spring-2026']
    }
  ],
  semesters: [
    {
      id: 'fall-2026',
      name: 'Fall 2026 Semester',
      code: 'FA26',
      href: '/semesters/fall-2026',
      departmentId: 'cse',
      departmentName: 'Computer Science & Engineering',
      academicYear: '2026–2027',
      startDate: 'September 1, 2026',
      endDate: 'January 15, 2027',
      totalCredits: 16,
      activeEnrolledStudents: 342,
      courseIds: ['cs401', 'cs402', 'cs403', 'math202']
    },
    {
      id: 'spring-2026',
      name: 'Spring 2026 Semester',
      code: 'SP26',
      href: '/semesters/spring-2026',
      departmentId: 'cse',
      departmentName: 'Computer Science & Engineering',
      academicYear: '2025–2026',
      startDate: 'February 1, 2026',
      endDate: 'June 20, 2026',
      totalCredits: 15,
      activeEnrolledStudents: 310,
      courseIds: ['cs301', 'cs303']
    }
  ],
  courses: [
    {
      id: 'cs401',
      code: 'CS401',
      name: 'Advanced Machine Learning & Neural Networks',
      department: 'Computer Science & Engineering',
      departmentId: 'cse',
      semester: 'Fall 2026 Semester',
      semesterId: 'fall-2026',
      credits: 4,
      instructor: 'Prof. David Anderson',
      officeHours: 'Tue/Thu 2:00 PM - 4:00 PM',
      classroom: 'Lab 402, Academic Building 3',
      description: 'Comprehensive study of deep learning architectures, gradient descent dynamics, attention mechanisms, and retrieval-augmented generation.',
      href: '/courses/cs401',
      ragIndexed: true,
      documentCount: 18,
      topicsCount: 24,
      topics: [
        'Backpropagation & Gradient Derivation',
        'Convolutional Neural Networks & Pooling',
        'Transformer Attention & Self-Attention',
        'Batch Normalization & LayerNorm',
        'Loss Functions (Cross-Entropy, MSE, Triplet)',
        'Vector Embeddings & Cosine Similarity'
      ]
    },
    {
      id: 'cs402',
      code: 'CS402',
      name: 'Distributed Systems & Cloud Computing',
      department: 'Computer Science & Engineering',
      departmentId: 'cse',
      semester: 'Fall 2026 Semester',
      semesterId: 'fall-2026',
      credits: 4,
      instructor: 'Dr. Sarah Lin',
      officeHours: 'Mon/Wed 10:00 AM - 12:00 PM',
      classroom: 'Room 310, Engineering Complex',
      description: 'Fault-tolerant consensus algorithms, Raft, Paxos, distributed storage, CRDTs, and scalable cloud microservice architectures.',
      href: '/courses/cs402',
      ragIndexed: true,
      documentCount: 14,
      topicsCount: 18,
      topics: [
        'Raft Consensus Protocol & Leader Election',
        'Conflict-free Replicated Data Types (CRDT)',
        'CAP Theorem & Eventual Consistency',
        'Distributed Key-Value Stores (Chubby, Dynamo)',
        'Vector Clocks & Lamport Timestamps'
      ]
    },
    {
      id: 'cs403',
      code: 'CS403',
      name: 'Modern Computer Networks & Protocols',
      department: 'Computer Science & Engineering',
      departmentId: 'cse',
      semester: 'Fall 2026 Semester',
      semesterId: 'fall-2026',
      credits: 4,
      instructor: 'Prof. Marcus Chen',
      officeHours: 'Fri 1:00 PM - 3:00 PM',
      classroom: 'Networking Lab 2',
      description: 'Software-defined networking, TCP congestion control algorithms (BBR, CUBIC), QUIC, and modern routing protocols.',
      href: '/courses/cs403',
      ragIndexed: true,
      documentCount: 11,
      topicsCount: 15,
      topics: [
        'TCP BBR vs CUBIC Congestion Control',
        'QUIC Protocol & 0-RTT Handshakes',
        'BGP Routing & Autonomous Systems',
        'TLS 1.3 Cryptographic Handshake',
        'Software Defined Networking (SDN) & OpenFlow'
      ]
    },
    {
      id: 'math202',
      code: 'MATH202',
      name: 'Advanced Linear Algebra & Matrix Analysis',
      department: 'Mathematics & Data Science',
      departmentId: 'math',
      semester: 'Fall 2026 Semester',
      semesterId: 'fall-2026',
      credits: 4,
      instructor: 'Dr. Michael Hopkins',
      officeHours: 'Mon/Thu 3:00 PM - 5:00 PM',
      classroom: 'Hall A, Science Hall',
      description: 'Vector spaces, linear transformations, spectral decomposition, SVD, positive definite matrices, and applications in optimization.',
      href: '/courses/math202',
      ragIndexed: true,
      documentCount: 16,
      topicsCount: 20,
      topics: [
        'Singular Value Decomposition (SVD)',
        'Eigenvalues & Hermitian Matrices',
        'Gram-Schmidt Orthogonalization',
        'Principal Component Analysis (PCA)',
        'Positive Semi-Definite Matrix Kernels'
      ]
    },
    {
      id: 'cs301',
      code: 'CS301',
      name: 'Operating Systems & Kernel Architecture',
      department: 'Computer Science & Engineering',
      departmentId: 'cse',
      semester: 'Spring 2026 Semester',
      semesterId: 'spring-2026',
      credits: 4,
      instructor: 'Prof. David Anderson',
      officeHours: 'Wed 2:00 PM - 4:00 PM',
      classroom: 'Lecture Hall 101',
      description: 'Virtual memory management, process scheduling, concurrency locks, kernel interrupts, and file system block layouts.',
      href: '/courses/cs301',
      ragIndexed: true,
      documentCount: 12,
      topicsCount: 16,
      topics: [
        'Virtual Memory & Page Replacement (LRU, Clock)',
        'Process Scheduling & Multi-level Feedback Queues',
        'Deadlock Prevention & Banker Algorithm',
        'Mutex Semaphores & Concurrency Conditions'
      ]
    },
    {
      id: 'cs303',
      code: 'CS303',
      name: 'Database Management Systems & Vector DBs',
      department: 'Computer Science & Engineering',
      departmentId: 'cse',
      semester: 'Spring 2026 Semester',
      semesterId: 'spring-2026',
      credits: 3,
      instructor: 'Dr. Sarah Lin',
      officeHours: 'Tue 10:00 AM - 12:00 PM',
      classroom: 'Database Lab 3',
      description: 'Relational algebra, B+ Tree index structures, ACID transactions, HNSW vector indexing, and pgvector semantic retrieval.',
      href: '/courses/cs303',
      ragIndexed: true,
      documentCount: 9,
      topicsCount: 14,
      topics: [
        'B+ Tree Indexing & Query Optimization',
        'HNSW & IVF Vector Indexing in pgvector',
        'Two-Phase Locking (2PL) & Strict Serializable ACID',
        'Relational Normalization (3NF & BCNF)'
      ]
    }
  ],
  resources: [
    {
      id: 'res-cs401-syl',
      title: 'CS401 Official Course Syllabus & Grading Breakdown',
      fileName: 'CS401_Syllabus_Fall2026.pdf',
      type: 'PDF Syllabus',
      courseCode: 'CS401',
      courseName: 'Machine Learning',
      courseId: 'cs401',
      semester: 'Fall 2026 Semester',
      department: 'Computer Science & Engineering',
      size: '1.8 MB',
      pages: 14,
      author: 'Prof. Anderson',
      status: 'Indexed in RAG',
      href: '/courses/cs401?tab=resources',
      tags: ['Syllabus', 'Policy', 'Grading', 'Midterm Schedule']
    },
    {
      id: 'res-cs401-lec4',
      title: 'Lecture 04 Slides: RAG Vector Indexing & Cosine Embeddings',
      fileName: 'CS401_Lecture04_RAG_Embeddings.pdf',
      type: 'PDF Slides',
      courseCode: 'CS401',
      courseName: 'Machine Learning',
      courseId: 'cs401',
      semester: 'Fall 2026 Semester',
      department: 'Computer Science & Engineering',
      size: '4.2 MB',
      pages: 38,
      author: 'Prof. Anderson',
      status: 'Indexed in RAG',
      href: '/courses/cs401?tab=resources',
      tags: ['RAG', 'Vector Search', 'pgvector', 'Cosine Similarity']
    },
    {
      id: 'res-cs401-exam',
      title: 'Midterm 2 Diagnostic Exam Bank & Solution Keys',
      fileName: 'CS401_Midterm2_Diagnostic_Exam_Bank.pdf',
      type: 'Exam Bank',
      courseCode: 'CS401',
      courseName: 'Machine Learning',
      courseId: 'cs401',
      semester: 'Fall 2026 Semester',
      department: 'Computer Science & Engineering',
      size: '920 KB',
      pages: 12,
      author: 'Graduate TA Team',
      status: 'Indexed in RAG',
      href: '/exams?tab=bank',
      tags: ['Exam Prep', 'Midterm 2', 'Practice Questions', 'Solutions']
    },
    {
      id: 'res-cs402-raft',
      title: 'Lecture 06 Notes: Raft Consensus & In-Search Replication',
      fileName: 'CS402_Lec06_Raft_Consensus.pdf',
      type: 'PDF Slides',
      courseCode: 'CS402',
      courseName: 'Distributed Systems',
      courseId: 'cs402',
      semester: 'Fall 2026 Semester',
      department: 'Computer Science & Engineering',
      size: '3.1 MB',
      pages: 26,
      author: 'Dr. Sarah Lin',
      status: 'Indexed in RAG',
      href: '/courses/cs402?tab=resources',
      tags: ['Raft', 'Consensus', 'Leader Election', 'Fault Tolerance']
    },
    {
      id: 'res-math202-svd',
      title: 'Chapter 06 Handout: Singular Value Decomposition & Low-Rank Approx',
      fileName: 'MATH202_Chapter06_SVD_Proof.pdf',
      type: 'Handout',
      courseCode: 'MATH202',
      courseName: 'Linear Algebra',
      courseId: 'math202',
      semester: 'Fall 2026 Semester',
      department: 'Mathematics & Data Science',
      size: '2.4 MB',
      pages: 18,
      author: 'Dr. Michael Hopkins',
      status: 'Indexed in RAG',
      href: '/courses/math202?tab=resources',
      tags: ['SVD', 'Eigenvalues', 'Orthogonal Matrices', 'Matrix Norms']
    },
    {
      id: 'res-cs403-tcp',
      title: 'Lecture 08 Deck: BBR vs CUBIC Bottleneck Bandwidth Modeling',
      fileName: 'CS403_Lec08_TCP_BBR.pdf',
      type: 'PDF Slides',
      courseCode: 'CS403',
      courseName: 'Computer Networks',
      courseId: 'cs403',
      semester: 'Fall 2026 Semester',
      department: 'Computer Science & Engineering',
      size: '3.8 MB',
      pages: 32,
      author: 'Prof. Marcus Chen',
      status: 'Indexed in RAG',
      href: '/courses/cs403?tab=resources',
      tags: ['TCP', 'BBR', 'Congestion Control', 'Throughput']
    }
  ],
  topics: [
    {
      id: 'top-backprop',
      title: 'Backpropagation & Gradient Optimization',
      category: 'Neural Networks',
      courseCode: 'CS401',
      courseId: 'cs401',
      semester: 'Fall 2026 Semester',
      difficulty: 'Hard',
      summary: 'Computational graphs, reverse-mode automatic differentiation, chain rule derivation for multi-layer perceptrons, and Hessian approximations.',
      citation: 'CS401 Lecture 03: Optimization & Gradient Dynamics (Slide 19)',
      href: '/exams?tab=practice'
    },
    {
      id: 'top-svd',
      title: 'Singular Value Decomposition (SVD)',
      category: 'Linear Algebra',
      courseCode: 'MATH202',
      courseId: 'math202',
      semester: 'Fall 2026 Semester',
      difficulty: 'Exam Standard',
      summary: 'Low-rank matrix factorizations A = U Sigma V^T, Frobenius norm minimization, Eckart-Young-Mirsky Theorem, and data compression.',
      citation: 'MATH202 Chapter 6: Matrix Decompositions (Page 142)',
      href: '/exams?tab=practice'
    },
    {
      id: 'top-cnn',
      title: 'Convolutional Filters & Receptive Field',
      category: 'Computer Vision',
      courseCode: 'CS401',
      courseId: 'cs401',
      semester: 'Fall 2026 Semester',
      difficulty: 'Medium',
      summary: '2D spatial convolutions, dilation factors, stride arithmetic, pooling layers, and effective receptive field derivation.',
      citation: 'CS401 Lecture 05: Convolutional Networks (Slide 12)',
      href: '/exams?tab=practice'
    },
    {
      id: 'top-attention',
      title: 'Transformer Multi-Head Self-Attention',
      category: 'Deep Learning',
      courseCode: 'CS401',
      courseId: 'cs401',
      semester: 'Fall 2026 Semester',
      difficulty: 'Hard',
      summary: 'Scaled dot-product attention QK^T / sqrt(d_k), quadratic scaling bottlenecks, causal masking, and flash attention hardware optimizations.',
      citation: 'CS401 Lecture 09: Transformer Architectures (Slide 22)',
      href: '/exams?tab=practice'
    },
    {
      id: 'top-raft',
      title: 'Raft Distributed Consensus Protocol',
      category: 'Distributed Systems',
      courseCode: 'CS402',
      courseId: 'cs402',
      semester: 'Fall 2026 Semester',
      difficulty: 'Hard',
      summary: 'Leader election terms, randomized timeouts, log replication invariants, and joint consensus cluster membership changes.',
      citation: 'CS402 Lecture 06: Consensus Protocols (Slide 14)',
      href: '/courses/cs402'
    },
    {
      id: 'top-vector-db',
      title: 'Vector Embeddings & HNSW Indexing',
      category: 'Databases & AI',
      courseCode: 'CS303',
      courseId: 'cs303',
      semester: 'Spring 2026 Semester',
      difficulty: 'Medium',
      summary: 'High-dimensional vector representations, cosine distance metrics, Hierarchical Navigable Small World graphs, and RAG retrieval pipelines.',
      citation: 'CS303 Lecture 11: Vector Databases & pgvector (Slide 8)',
      href: '/courses/cs303'
    }
  ]
};

/**
 * Unified Search Algorithm: Searches courses, resources, and topics from one keyword query
 */
export function searchAcademicWorkspace(rawQuery) {
  if (!rawQuery || typeof rawQuery !== 'string' || !rawQuery.trim()) {
    return {
      query: '',
      totalMatches: 0,
      courses: [],
      resources: [],
      topics: []
    };
  }

  const query = rawQuery.trim().toLowerCase();
  const qTerms = query.split(/\s+/).filter(Boolean);

  const matchesText = (text) => {
    if (!text) return false;
    const lower = text.toLowerCase();
    return qTerms.every((term) => lower.includes(term));
  };

  // 1. Search Courses
  const matchingCourses = academicHierarchy.courses.filter((c) => {
    return (
      matchesText(c.code) ||
      matchesText(c.name) ||
      matchesText(c.department) ||
      matchesText(c.instructor) ||
      matchesText(c.description) ||
      c.topics.some((t) => matchesText(t))
    );
  });

  // 2. Search Resources
  const matchingResources = academicHierarchy.resources.filter((r) => {
    return (
      matchesText(r.title) ||
      matchesText(r.fileName) ||
      matchesText(r.courseCode) ||
      matchesText(r.courseName) ||
      matchesText(r.author) ||
      r.tags.some((tag) => matchesText(tag))
    );
  });

  // 3. Search Topics
  const matchingTopics = academicHierarchy.topics.filter((top) => {
    return (
      matchesText(top.title) ||
      matchesText(top.category) ||
      matchesText(top.courseCode) ||
      matchesText(top.summary) ||
      matchesText(top.citation)
    );
  });

  const totalMatches =
    matchingCourses.length + matchingResources.length + matchingTopics.length;

  return {
    query: rawQuery.trim(),
    totalMatches,
    courses: matchingCourses,
    resources: matchingResources,
    topics: matchingTopics
  };
}
