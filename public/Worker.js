self.onmessage = (e) => {
	const { startTimer = false, destroy = false } = e.data || {};

	if (startTimer && !destroy) {
		self.timer_id = self.setInterval(() => {
			self.total_time = (self.total_time || 1) + 1;
			self.postMessage({ time: 1, totalTime: self.total_time });
		}, 1000);
	}

	if (destroy && self.timer_id) {
		clearInterval(self.timer_id);
		self.total_time = null;
	}
};
