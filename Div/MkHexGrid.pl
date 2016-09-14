use Math::Trig;
# use Math::Round;

my $def = '<defs><polygon id="Hx" points="%s"/></defs>'."\n";	
my $tpl = '<use class="H" id="H%02d%02d" xlink:href="#Hx" x="%0.2f" y="%0.2f"/>'."\n";

my $OX = 160;
my $OY = 340;
my $Size = 5880/81;
my $Vert = $Size * sqrt(3);
my $W = 5880;
my $H = 5880;

# print '<?xml version="1.0" encoding="UTF-8" standalone="no"?>'."\n<svg>\n";
print "<g>";

printf( $def, hexPoints( 0, 0, $Size ) );

$dx = 0;
for(my $x = 0; $x < $W; $x += 1.5 * $Size) {

	my( $dV ) = ($dx % 2) == 0 ? 0 :  $Vert/2;
	for(my $y = 0; $y < $H; $y += $Vert) {
		printf( $tpl, $dx, $dy, $x + $OX, $y + $OY + $dV );
		$dy++;
	}
	print "\n";
	$dy = 0;
	$dx++;
}
print "</g>";
# print "</svg>\n";

exit(0);

sub hexPoints ($$$) {
	my ($cx,$cy,$r) = @_;
	my (@pts) = ();

	for(my $i=0;$i<6;$i++) {
		push( @pts, int( 0.5 + 100 * ( $cx + $r * cos( deg2rad( 60 * $i ) ) ) )/100, int( 0.5 + 100 * ( $cy + $r * sin( deg2rad( 60 * $i ) ) ) )/100 ) ;
	}
	return join(' ', @pts);
}