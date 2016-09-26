use Data::Dumper;
use JSON qw( );
our $JS = JSON->new;

my $str = File2String('../src/data/Map.json');
my $res = $JS->decode( $str );

# print Data::Dumper->Dump([ $res ], [ 'res' ]);

$NatFile = join("\t", 'Code', 'Nom', 'NomLong','Couleur' )."\n";
foreach my $nat (keys %{ $res->{Nations} }) {
	$NatFile .= join("\t", $nat, $res->{Nations}{$nat}{Nom}, $res->{Nations}{$nat}{NomLong}, $res->{Nations}{$nat}{Couleur} )."\n";
	foreach my $city (@{ $res->{Nations}{$nat}{Cities} }) {
		$res->{Cities}{$city}{Nation} = $res->{Nations}{$nat}{Nom};
	}
}
# print $NatFile;
String2File("Nations.tsv",$NatFile);

$CityFile .= join("\t", "Nom", "Nation", "Type", "Hexagone", "Fortification", "Description" )."\n";
foreach my $city (keys %{ $res->{Cities} }) {
	$CityFile .= join("\t", $city, $res->{Cities}{$city}{Nation}, $res->{Cities}{$city}{Type}, $res->{Cities}{$city}{H}, ($res->{Cities}{$city}{Fortification}?$res->{Cities}{$city}{Fortification}:'?'), $res->{Cities}{$city}{Desc} )."\n";
}
# print $CityFile;
String2File("Cities.tsv",$CityFile);

$ResFile .= join("\t", "Nom", "Nation", "Type", "Hexagone", "Qté" )."\n";
# print $ResFile;
String2File("Ressources.tsv",$ResFile);

exit(0);

sub File2String ($;@) 	{
	my($name) = shift(@_);
	my(@variables) = @_;
	my($Template) = "";

	open(FIC,"<$name");
	while (<FIC>) {$Template .= $_;}
	close(FIC);
	return sprintf('%s', String2String($Template, @variables));
}

sub String2File ($$$;@) {
	my($name) = shift(@_);
	my($chen) = shift(@_);
	my(@variables) = @_;

	open(FIC,">$name");
	print FIC sprintf('%s', String2String($chen, @variables));
	close(FIC);
}

sub String2String ($$;@) {
	my($string,@variables) = @_;
	my($name,$interpolant);

	while($name=shift(@variables))
	{
		$interpolant = shift(@variables);
		$string =~ s/$name/$interpolant/g;
	}
	return $string;
}