it('should return a 500 status code when an error occurs in the first error handling middleware', (done) => {
  const mockError = new Error('Test error');
  const mockReq = {};
  const mockRes = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn()
  };
  const mockNext = jest.fn();

  app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })(mockError, mockReq, mockRes, mockNext);

  expect(mockRes.status).toHaveBeenCalledWith(500);
  expect(mockRes.send).toHaveBeenCalledWith('Something broke!');
  expect(mockNext).not.toHaveBeenCalled();
  done();
});