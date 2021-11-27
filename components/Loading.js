const Loading = () => {
  return (
    <div
      className="position-fixed w-100 h-100 text-center loading"
      style={{
        background: '#0008',
        color: 'white',
        top: 0,
        left: 0,
        zIndex: 9,
      }}
    >
      <svg width="205" height="250" viewBox="0 0 45 50">
        <circle cx="150" cy="150" r="140"></circle>
        <circle cx="150" cy="150" r="100"></circle>
        <p fill="#fff">Loading</p>
      </svg>
    </div>
  );
};

export default Loading;
