app
	////////////////////
	// Service de Zoom//
	////////////////////
	.factory('Zoom', ['$document', 'Prefs', function ($document, Prefs) {
		var svc = {};
		svc.ViewBox = "";
		svc.Size = { Lst: [["640px", "640px"], ["800px", "800px"], ["980px", "980px"]] };
		svc.Size.Crt = Prefs.Get('CrtSize', 2);
		svc.vBox = {
			Min: { x: 0, y: 0, w: 980, h: 980 },
			Max: { x: 5880, y: 5880, w: 5880, h: 5880 },
			Crt: { x: 0, y: 0, w: 5880, h: 5880 }
		};

		svc.setBox = function () {
			if (svc.vBox.Crt.w > svc.vBox.Max.w) svc.vBox.Crt.w = svc.vBox.Max.w;
			if (svc.vBox.Crt.h > svc.vBox.Max.h) svc.vBox.Crt.h = svc.vBox.Max.h;
			if (svc.vBox.Crt.w < svc.vBox.Min.w) svc.vBox.Crt.w = svc.vBox.Min.w;
			if (svc.vBox.Crt.h < svc.vBox.Min.h) svc.vBox.Crt.h = svc.vBox.Min.h;

			if (svc.vBox.Crt.x < svc.vBox.Min.x) svc.vBox.Crt.x = svc.vBox.Min.x;
			if (svc.vBox.Crt.y < svc.vBox.Min.y) svc.vBox.Crt.y = svc.vBox.Min.y;
			if (svc.vBox.Crt.x + svc.vBox.Crt.w > svc.vBox.Max.x) svc.vBox.Crt.x = svc.vBox.Max.x - svc.vBox.Crt.w;
			if (svc.vBox.Crt.y + svc.vBox.Crt.h > svc.vBox.Max.y) svc.vBox.Crt.y = svc.vBox.Max.y - svc.vBox.Crt.h;
			svc.ViewBox = svc.vBox.Crt.x + " " + svc.vBox.Crt.y + " " + svc.vBox.Crt.w + " " + svc.vBox.Crt.h;
		};

		svc.Frame = function (dlt) {
			var crt = svc.Size.Crt + dlt;
			if (crt < 0) {
				crt = 0;
			}
			if (crt > 2) {
				crt = 2;
			}
			svc.Size.Crt = crt;
			Prefs.Set('CrtSize', svc.Size.Crt);
		}

		svc.InOut = function (fac, bZoom, cX, cY) {

			cX = typeof cX !== 'undefined' ? cX : svc.vBox.Crt.x + svc.vBox.Crt.w / 2;
			cY = typeof cY !== 'undefined' ? cY : svc.vBox.Crt.y + svc.vBox.Crt.h / 2;

			if (bZoom) {
				svc.vBox.Crt.w /= fac;
				svc.vBox.Crt.h /= fac;
			} else {
				svc.vBox.Crt.w *= fac;
				svc.vBox.Crt.h *= fac;
			}
			svc.vBox.Crt.x = cX - svc.vBox.Crt.w / 2;
			svc.vBox.Crt.y = cY - svc.vBox.Crt.h / 2;
			svc.setBox();
		}

		svc.Move = function (mW, mH) {
			svc.vBox.Crt.x += mW * svc.vBox.Crt.w;
			svc.vBox.Crt.y += mH * svc.vBox.Crt.h;
			svc.setBox();
		}

      svc.Wheel = function (event, delta, deltaX, deltaY) {
			if (delta > 0) {
				svc.InOut(1.1, true);
			} else if (delta < 0) {
				svc.InOut(1.1, false);
			}
			event.stopPropagation();
			event.preventDefault();
      };

      svc.WheelCenter = function (event, delta, deltaX, deltaY) {
			var svg = $document[0].getElementById('svgMap');
			var pt = svg.createSVGPoint();
			pt.x = event.pageX || event.originalEvent.pageX || event.originalEvent.clientX;
			pt.y = event.pageY || event.originalEvent.pageY || event.originalEvent.clientY;
			var ptm = pt.matrixTransform(svg.getScreenCTM().inverse());

			if (delta > 0) {
				svc.InOut(1.1, true, ptm.x, ptm.y);
			} else if (delta < 0) {
				svc.InOut(1.1, false, ptm.x, ptm.y);
			}
			event.stopPropagation();
			event.preventDefault();
      };

		svc.Box = function (box) {
			var zf = (box.W > box.H) ? box.W : box.H;
			svc.vBox.Crt.x = box.X + box.W / 2 - zf / 2;
			svc.vBox.Crt.y = box.Y + box.H / 2 - zf / 2;
			svc.vBox.Crt.w = zf;
			svc.vBox.Crt.h = zf;
			svc.setBox();
		}

		svc.isZoomed = function () {
			return ((svc.vBox.Crt.w != svc.vBox.Max.w) || (svc.vBox.Crt.h != svc.vBox.Max.h));
		}

		svc.Org = function () {
			svc.vBox.Crt = { x: svc.vBox.Min.x, y: svc.vBox.Min.y, w: svc.vBox.Max.w, h: svc.vBox.Max.h };
			svc.setBox();
		}

		return svc;
	}]);