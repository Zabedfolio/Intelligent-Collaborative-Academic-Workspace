// 100 Curated Curriculum-Aligned Exam Questions for CS401 & MATH202

export const sample100Questions = Array.from({ length: 100 }, (_, index) => {
  const id = index + 1;
  const topics = [
    'Deep Learning & Backpropagation',
    'Convolutional Neural Networks',
    'Recurrent Architectures & Transformers',
    'Optimization Algorithms (Adam, SGD)',
    'Dimensionality Reduction & PCA',
    'Linear Algebra & SVD',
    'Support Vector Machines & Kernels',
    'Decision Trees & Random Forests',
    'Regularization (L1, L2, Dropout)',
    'Bayesian Inference & Naive Bayes'
  ];
  
  const difficulties = ['Easy', 'Medium', 'Hard', 'Exam Standard'];
  const topic = topics[index % topics.length];
  const difficulty = difficulties[index % difficulties.length];

  const questionsPool = [
    {
      q: `Derive the analytical gradient of cross-entropy loss with respect to logits in a multi-class softmax layer.`,
      a: `The gradient simplifies directly to \\hat{y}_i - y_i (predicted probability minus one-hot ground truth target).`,
      citation: `CS401 Lecture 03: Loss Functions & Optimization (Slide 19)`
    },
    {
      q: `Explain why batch normalization stabilizes training and mitigate internal covariate shift.`,
      a: `Batch normalization rescales activations to zero mean and unit variance per mini-batch, smoothing the optimization landscape.`,
      citation: `CS401 Lecture 07: Normalization & Optimization (Slide 34)`
    },
    {
      q: `Calculate the receptive field of a 3-layer CNN with 3x3 kernels and stride 1 with no pooling.`,
      a: `Each 3x3 convolution layer increases receptive field by (k-1)=2. Three layers yield 1 + 2*3 = 7x7 receptive field.`,
      citation: `CS401 Lecture 05: Convolutional Networks (Slide 12)`
    },
    {
      q: `State the mathematical definition and purpose of the Singular Value Decomposition (SVD) of matrix A.`,
      a: `A = U \\Sigma V^T, decomposing A into orthogonal matrices U, V and diagonal singular values \\Sigma for optimal low-rank rank-k approximations.`,
      citation: `MATH202 Chapter 6: Matrix Decompositions (Page 142)`
    },
    {
      q: `Why does Self-Attention computational complexity scale quadratically with sequence length n?`,
      a: `Computing the attention matrix QK^T requires an (n \\times d) by (d \\times n) matrix multiplication, producing an n \\times n weight matrix.`,
      citation: `CS401 Lecture 09: Transformer Architectures (Slide 22)`
    },
    {
      q: `Compare L1 (Lasso) and L2 (Ridge) regularization regarding parameter sparsity.`,
      a: `L1 regularization introduces non-differentiable sharp corners at zero in its parameter penalty, driving redundant weights exactly to zero.`,
      citation: `CS401 Lecture 04: Generalization & Regularization (Slide 27)`
    },
    {
      q: `Under what geometric condition does the Kernel Trick allow non-linearly separable data to be separated?`,
      a: `Cover's Theorem states that non-separable patterns projected into higher-dimensional Hilbert space are more likely to be linearly separable.`,
      citation: `CS401 Lecture 08: Support Vector Machines (Slide 41)`
    },
    {
      q: `Explain why standard RNNs suffer from vanishing gradients over long temporal horizons.`,
      a: `Repeated matrix multiplication of hidden state weights W_{hh} over T time steps scales gradients by eigenvalues \\lambda^T. If |\\lambda| < 1, gradient vanishes.`,
      citation: `CS401 Lecture 10: Sequential Modeling (Slide 16)`
    },
    {
      q: `Prove that the eigenvalues of a real symmetric matrix are always strictly real.`,
      a: `Using the Hermitian property: \\lambda v^H v = v^H A v = (A v)^H v = \\bar{\\lambda} v^H v, which implies \\lambda = \\bar{\\lambda}.`,
      citation: `MATH202 Chapter 5: Eigenvalues & Hermitian Operators (Page 118)`
    },
    {
      q: `What is the role of temperature \\tau in the Softmax activation function during distillation or sampling?`,
      a: `As \\tau \\to 0, softmax approaches argmax (hard distribution); as \\tau \\to \\infty, the distribution smooths into a uniform distribution.`,
      citation: `CS401 Lecture 11: Model Compression & Ensembling (Slide 8)`
    }
  ];

  const template = questionsPool[index % questionsPool.length];

  return {
    id,
    questionNumber: `Q-${String(id).padStart(3, '0')}`,
    title: `[${topic}] ${template.q}`,
    topic,
    difficulty,
    questionText: `Exam Question #${id}: ${template.q}`,
    solution: template.a,
    citation: template.citation,
    courseCode: index % 2 === 0 ? 'CS401' : 'MATH202',
    tags: [topic.split(' ')[0], difficulty],
    estimatedTime: `${Math.floor(Math.random() * 4) + 3} mins`,
    averageScore: `${Math.floor(Math.random() * 30) + 65}%`,
    options: [
      { id: 'opt-a', text: template.a, isCorrect: true },
      { id: 'opt-b', text: `Gradient decays exponentially without bounds due to unbounded softmax denominator.`, isCorrect: false },
      { id: 'opt-c', text: `Requires inverse Hessian matrix calculation at each iteration step.`, isCorrect: false },
      { id: 'opt-d', text: `Strictly dependent on batch size matching feature dimensionality.`, isCorrect: false }
    ]
  };
});
